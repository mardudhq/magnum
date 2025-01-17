import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  InjectWebSocketProvider,
  OnMessage,
  OnOpen,
  WebSocketClient,
} from 'nestjs-websocket';
import { load, Type } from 'protobufjs';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';

@Injectable()
export class DataFeedService implements OnModuleInit {
  private readonly logger = new Logger(DataFeedService.name);
  private ticker: Type;
  private tickers: string[];

  constructor(
    @InjectWebSocketProvider()
    private readonly ws: WebSocketClient,
    private readonly companyRegistryService: CompanyRegistryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    try {
      const root = await load('src/data-feed/proto/PricingData.proto');
      this.ticker = root.lookupType('PricingData');
      const companies = await this.companyRegistryService.findAll();
      this.tickers = companies
        .map((company) => company.symbol)
        .map((symbol) => `${symbol}.SR`);
      this.tickers = [...this.tickers, ...['NVDA', 'AAPL', 'A', 'AA', 'AACG']];
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error while initializing ${DataFeedService.name}: ${error.message}`,
        );
      }
    }
  }

  @OnOpen()
  onOpen() {
    this.logger.log('Websocket connection established');
    this.ws.send(JSON.stringify({ subscribe: this.tickers }));
    this.logger.log(`Subscribed to ${this.tickers.length} tickers`);
  }

  @OnMessage()
  async message(data: WebSocketClient.Data) {
    try {
      const payload = this.ticker
        .decode(Buffer.from(data.toString(), 'base64'))
        .toJSON();
      this.eventEmitter.emit('ticker.received', payload);
    } catch (error) {
      this.logger.error(
        `Websocket error in ${DataFeedService.name}: ${error.message}`,
      );
    }
  }
}
