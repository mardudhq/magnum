import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRegistryService } from 'src/company-registry/company-registry.service';
import yahooFinance from 'yahoo-finance2';

interface HistoricalOptions {
  period1: Date;
  period2?: Date;
  interval?:
    | '1m'
    | '2m'
    | '5m'
    | '15m'
    | '30m'
    | '60m'
    | '90m'
    | '1h'
    | '1d'
    | '5d'
    | '1wk'
    | '1mo'
    | '3mo';
}

@Injectable()
export class HistoricalService {
  private readonly logger = new Logger(HistoricalService.name);

  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  async getHistoricalBySymbol(symbol: string, options: HistoricalOptions) {
    try {
      const { period1, period2, interval = '1d' } = options;

      if (period2 && period2 <= period1)
        throw new Error('period2 must be after period1');

      const params = {
        period1: period1.toISOString(), // Ensure the date is in the correct format
        period2: period2 ? period2.toISOString() : undefined,
        interval,
      };

      // Check if symbol exists in the company registry
      const company = await this.companyRegistryService.findBySymbol(symbol);

      if (!company)
        throw new NotFoundException("The symbol isn't in the registry");

      // Postfix symbol with `.SR`
      // TODO: implement a generic way for this in an interceptor or smth else.
      if (!symbol.endsWith('.SR')) symbol += '.SR';

      const result = await yahooFinance.chart(symbol, params);
      return result;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof Error) {
        this.logger.error(
          `Error occured in ${HistoricalService.name}: ${error.message}`,
        );
        throw new Error(
          `Failed to retrieve historical data for symbol "${symbol}". Reason: ${error.message}`,
        );
      } else {
        throw new Error(
          `An unexpected error occurred while fetching data for symbol "${symbol}"`,
        );
      }
    }
  }
}
