import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { YF_SERVER_URL } from 'src/config/config.constant';
import { RawData, WebSocket } from 'ws';
import { DataFeedService } from './data-feed.service';

@Injectable()
export class WsManagerService implements OnApplicationBootstrap {
  private readonly logger = new Logger(WsManagerService.name);

  // Maximum number of tickers that a single client can subscribe for.
  private readonly CHUNK_SIZE = 100;
  private tickers: string[] = [];
  private wsClientsMap: Map<number, WebSocket> = new Map();

  constructor(
    private readonly dataFeedService: DataFeedService,
    private readonly configService: ConfigService,
  ) {}

  // Start creating WebSocket clients
  onApplicationBootstrap() {
    this.tickers = this.dataFeedService.getTickers();
    const totalChunks = Math.ceil(this.tickers.length / this.CHUNK_SIZE);

    Array.from({ length: totalChunks }).forEach((_, chunkIndex) => {
      const tickersChunk = this.getTickersChunk(chunkIndex);
      const clientId = chunkIndex + 1;

      this.logger.debug(`Chunk ${clientId} size: ${tickersChunk.length}`);
      this.createWsClient(clientId, tickersChunk);
    });
  }

  private getTickersChunk(chunkIndex: number): string[] {
    const start = chunkIndex * this.CHUNK_SIZE;
    const end = start + this.CHUNK_SIZE;
    return this.tickers.slice(start, end);
  }

  private createWsClient(clientId: number, tickers: string[]): void {
    const ws = new WebSocket(this.configService.get<string>(YF_SERVER_URL));

    ws.on('open', () => this.onOpen(ws, clientId, tickers));
    ws.on('message', (data: RawData) => this.onMessage(data));
    ws.on('close', () => this.onClose(clientId));
    ws.on('error', () => this.onError(clientId));

    this.wsClientsMap.set(clientId, ws);
  }

  private onOpen(ws: WebSocket, clientId: number, tickers: string[]) {
    ws.send(JSON.stringify({ subscribe: tickers }));
    this.logger.log(
      `Client [${clientId}] subscribed to ${tickers.length} tickers`,
    );
  }

  private async onMessage(data: RawData) {
    const rawTicker = await this.dataFeedService.decodeRawTicker(data);
    if (rawTicker) {
      this.dataFeedService.emitRawTicker(rawTicker);
    }
  }

  /**
   * When a socket closes, caused by an error, try
   * reconnecting by establishing a new WebSocket client
   * with the previous tickers that the previous client was
   * using.
   */
  private async onClose(clientId: number) {
    this.logger.error(`Client [${clientId}] closed`);
    this.logger.log(`Client [${clientId}] reconnecting`);

    this.logger.log('Waiting 1 seconds');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const tickers = this.getTickersChunk(clientId - 1);
    this.createWsClient(clientId, tickers);
  }

  private onError(clientId: number) {
    this.logger.error(`Client [${clientId}] error`);
  }

  /**
   * Pick a WebSocket client from the
   * map and force terminate it, to trigger
   * on close event.
   */
  _test_reconnection_on_close() {
    const rnd = Math.floor(Math.random() * this.wsClientsMap.size) + 1;
    const ws = this.wsClientsMap.get(rnd);
    ws.terminate();
  }
}
