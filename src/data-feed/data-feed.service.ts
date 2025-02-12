import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { load, Type } from 'protobufjs';
import { RawTickerDto } from 'src/common/dto/raw-ticker.dto';
import { TickerError } from 'src/common/errors/ticker.error';
import { IRawTicker } from 'src/common/interfaces/raw-ticker.interface';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';
import { TICKER_RECEIVED_EVENT } from 'src/events/events.constant';
import { TickerReceivedEvent } from 'src/events/ticker-received.event';
import { RawData } from 'ws';

@Injectable()
export class DataFeedService implements OnModuleInit {
  private readonly logger = new Logger(DataFeedService.name);
  private tickerMessage: Type;
  private tickers: string[];

  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    try {
      const root = await load('src/data-feed/proto/PricingData.proto');
      this.tickerMessage = root.lookupType('PricingData');

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

  async emitRawTicker(rawTicker: IRawTicker): Promise<void> {
    const tickerReceivedEvent = new TickerReceivedEvent(rawTicker);

    this.eventEmitter.emit(TICKER_RECEIVED_EVENT, tickerReceivedEvent);
  }

  async decodeRawTicker(data: RawData): Promise<RawTickerDto> {
    try {
      const payload = this.tickerMessage
        .decode(Buffer.from(data.toString(), 'base64'))
        .toJSON();

      const rawTicker = plainToInstance(RawTickerDto, payload);
      const errors = await validate(rawTicker);
      if (errors.length !== 0)
        throw new TickerError(
          `Ticker ${JSON.stringify(rawTicker)} is not valid. ValidationError: ${JSON.stringify(errors)}`,
        );

      return rawTicker;
    } catch (error) {
      if (error instanceof TickerError) {
        // Skip this ticker. Log to a file later.
        return null;
      }
      return null;
    }
  }
}
