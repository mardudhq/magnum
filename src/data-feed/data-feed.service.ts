import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  InjectWebSocketProvider,
  OnMessage,
  OnOpen,
  WebSocketClient,
} from 'nestjs-websocket';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RealtimeStockData } from './schemas/realtime-stock-data.schema';
import { load, Type } from 'protobufjs';
import { IRealtimeStockData } from './interfaces/realtime-stock-data.interface';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';

@Injectable()
export class DataFeedService implements OnModuleInit {
  private readonly logger = new Logger(DataFeedService.name);
  private ticker: Type;
  private tickers: string[];

  constructor(
    @InjectWebSocketProvider()
    private readonly ws: WebSocketClient,
    @InjectModel(RealtimeStockData.name)
    private readonly realtimeStockDataModel: Model<RealtimeStockData>,
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  async onModuleInit() {
    try {
      const root = await load('src/data-feed/proto/PricingData.proto');
      this.ticker = root.lookupType('PricingData');
      const companies = await this.companyRegistryService.findAll();
      this.tickers = companies
        .map((company) => company.symbol)
        .map((symbol) => `${symbol}.SR`);
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
      const message = this.ticker
        .decode(Buffer.from(data.toString(), 'base64'))
        .toJSON() as IRealtimeStockData;

      const {
        id,
        exchange,
        time,
        price,
        change,
        changePercent,
        quoteType,
        marketHours,
      } = message;

      const d = new Date(+time);

      console.log(
        `[${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.toLocaleTimeString()}]\t${id}\t${price.toFixed(2)}\t${change.toFixed(2)}\t${changePercent.toFixed(2)}`,
      );

      await this.realtimeStockDataModel.create(message);
    } catch (error) {
      this.logger.error(
        `Websocket error in ${DataFeedService.name}: ${error.message}`,
      );
    }
  }
}
