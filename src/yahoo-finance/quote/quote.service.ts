/**
 * This service is for fetching quotes of a symbol
 */
import { Injectable, Logger } from '@nestjs/common';
import yahooFinance from 'yahoo-finance2';

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);

  // TODO: utilize the returned fields
  async quote(symbols: string[]) {
    try {
      const result = await yahooFinance.quote(symbols);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error occured in ${QuoteService.name}: ${error.message}`,
        );
        throw new Error(
          `Failed to retrieve quotes data for the symbols "${symbols.join(',')}". Reason: ${error.message}`,
        );
      } else {
        throw new Error(
          `An unexpected error occurred while fetching data for the symbols "${symbols.join(',')}"`,
        );
      }
    }
  }
}
