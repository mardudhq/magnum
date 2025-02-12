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
  private wsClients: WebSocket[] = [];
  private tickers: string[] = [];

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
      this.createWebSocketClient(clientId, tickersChunk);
    });
  }

  private getTickersChunk(chunkIndex: number): string[] {
    const start = chunkIndex * this.CHUNK_SIZE;
    const end = start + this.CHUNK_SIZE;
    return this.tickers.slice(start, end);
  }

  private createWebSocketClient(clientId: number, tickers: string[]) {
    const ws = new WebSocket(this.configService.get<string>(YF_SERVER_URL));

    ws.on('open', () => this.handleOpen(ws, clientId, tickers));
    ws.on('message', (data: RawData) => this.handleMessage(data));
    ws.on('close', () => this.handleClose(clientId));
    ws.on('error', () => this.handleError(clientId));

    this.wsClients.push(ws);
  }

  private handleOpen(ws: WebSocket, clientId: number, tickers: string[]) {
    ws.send(JSON.stringify({ subscribe: tickers }));
    this.logger.log(
      `Client [${clientId}] subscribed to ${tickers.length} tickers`,
    );
  }

  private async handleMessage(data: RawData) {
    const rawTicker = await this.dataFeedService.decodeRawTicker(data);
    if (rawTicker) {
      this.dataFeedService.emitRawTicker(rawTicker);
    }
  }

  private handleClose(clientId: number) {
    this.logger.error(`Client [${clientId}] closed`);
  }

  private handleError(clientId: number) {
    this.logger.error(`Client [${clientId}] errored`);
  }
}
