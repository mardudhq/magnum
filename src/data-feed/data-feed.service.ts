import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { load, Type } from 'protobufjs';
import { TickerDto } from 'src/common/dto/ticker.dto';
import { TickerError } from 'src/common/errors/ticker.error';
import { ITicker } from 'src/common/interfaces/ticker.interface';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';
import { TICKER_RECEIVED_EVENT } from 'src/events/events.constant';
import { TickerReceivedEvent } from 'src/events/ticker-received.event';
import { RawData } from 'ws';

@Injectable()
export class DataFeedService implements OnModuleInit {
  private readonly logger = new Logger(DataFeedService.name);
  private ticker: Type;
  private tickers: string[];

  constructor(
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

  getTickers() {
    return this.tickers;
  }

  async emitTicker(ticker: ITicker) {
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

    this.eventEmitter.emit(TICKER_RECEIVED_EVENT, tickerReceivedEvent);
  }

  async decodeTicker(data: RawData) {
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

      return ticker;
    } catch (error) {
      if (error instanceof TickerError) {
        // Skip this ticker. Log to a file later.
      }
      return null;
    }
  }
}
