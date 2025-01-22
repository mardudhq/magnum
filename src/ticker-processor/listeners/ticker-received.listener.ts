import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TickerReceivedEvent } from 'src/events/ticker-received.event';
import { TickerProcessorService } from '../ticker-processor.service';
import {
  TICKER_PROCESSED_EVENT,
  TICKER_RECEIVED_EVENT,
} from 'src/events/events.constant';

@Injectable()
export class TickerReceivedListener {
  private readonly logger = new Logger(TickerReceivedListener.name);

  constructor(
    private readonly tickerProcessorService: TickerProcessorService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent(TICKER_RECEIVED_EVENT)
  async handleTickerReceived(event: TickerReceivedEvent) {
    const ticker = { ...event };
    try {
      this.tickerProcessorService.printTicker(ticker);
      this.tickerProcessorService.append(ticker);
      this.eventEmitter.emit(TICKER_PROCESSED_EVENT, ticker);
    } catch (error) {
      if (error instanceof Error)
        this.logger.error(`Failed to process ticker: ${error.message}`);
    }
  }
}
