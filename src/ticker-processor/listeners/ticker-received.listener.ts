import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { toDecimal128 } from 'src/common/helpers/to-mongo-decimal.helper';
import { ITicker } from 'src/common/interfaces/ticker.interface';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';
import {
  TICKER_PROCESSED_EVENT,
  TICKER_RECEIVED_EVENT,
} from 'src/events/events.constant';
import { TickerReceivedEvent } from 'src/events/ticker-received.event';
import { TickerProcessorService } from '../ticker-processor.service';

/**
 * Process ticker received from external source
 * convert it into format shape, print it, append it
 * into time-series collection, update its corresponding
 * company latest price.
 */

@Injectable()
export class TickerReceivedListener {
  private readonly logger = new Logger(TickerReceivedListener.name);

  constructor(
    private readonly tickerProcessorService: TickerProcessorService,
    private readonly companyRegistryService: CompanyRegistryService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(TICKER_RECEIVED_EVENT)
  async handleTickerReceived(event: TickerReceivedEvent) {
    /**
     * Negative price is excluded.
     */
    if (!(event.price >= 0)) {
      return;
    }

    /**
     * Encapsulate and convert the values
     * into a ticker object.
     *
     * Normalize the symbol, remove the .SR suffix from it.
     *
     * `toDecimal128` a helper function to convert
     * the number values into a Mongo Decimal128 type
     * with a precision of 2.
     */
    const normalizedSymbol =
      event.id.indexOf('.') !== -1
        ? event.id.slice(0, event.id.indexOf('.'))
        : event.id;

    const ticker: ITicker = {
      symbol: normalizedSymbol,
      time: event.time,
      price: toDecimal128(event.price),
      change: toDecimal128(event.change),
      changePercent: toDecimal128(event.changePercent),
    };

    try {
      const savedTicker = await this.tickerProcessorService.saveTicker(ticker);

      // npm run start --TICKLOG=true
      if (process.env.npm_config_TICKLOG && savedTicker) {
        this.tickerProcessorService.printTicker(ticker);
      }

      await this.companyRegistryService.updateLastPrice(ticker);

      /**
       * After processing and saving, emit it to any
       * interested listeners.
       */
      this.eventEmitter.emit(TICKER_PROCESSED_EVENT, ticker);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to process ticker: ${error.message}`);
      }
    }
  }
}
