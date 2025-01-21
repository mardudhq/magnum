import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  InjectWebSocketProvider,
  OnMessage,
  OnOpen,
  WebSocketClient,
} from 'nestjs-websocket';
import { load, Type } from 'protobufjs';
import { TickerDto } from 'src/common/dto/ticker.dto';
import { TickerError } from 'src/common/errors/ticker.error';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';
import { TickerReceivedEvent } from 'src/events/ticker-received.event';

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

  // ...it smells.
  @OnMessage()
  async message(data: WebSocketClient.Data) {
    try {
      const payload = this.ticker
        .decode(Buffer.from(data.toString(), 'base64'))
        .toJSON();

      const ticker = plainToInstance(TickerDto, payload);
      const errors = await validate(ticker);

      if (errors.length !== 0)
        throw new TickerError(
          `Ticker ${JSON.stringify(ticker)} is not valid. ValidationError: ${JSON.stringify(errors)}`,
        );

      const { time, change, changePercent, exchange, id, price, priceHint } =
        ticker;

      const tickerReceivedEvent = new TickerReceivedEvent(
        time,
        id,
        exchange,
        price,
        change,
        changePercent,
        priceHint,
      );

      this.eventEmitter.emit('ticker.received', tickerReceivedEvent);
    } catch (error) {
      if (error instanceof TickerError) {
        this.logger.error(error.message);
      } else {
        this.logger.error(
          `Websocket error in ${DataFeedService.name}: ${error.message}`,
        );
      }
    }
  }
}
