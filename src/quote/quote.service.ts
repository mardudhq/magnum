/**
 * Handles fetching stock quotes and performance data
 * from external API `FMP`. It provides methods to retrieve
 * full quotes, short quotes, and even all quotes listed on
 * the exchange.
 */
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Quote } from './interface/quote.interface';
import { ROUTES } from './company.constant';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs';
import { ShortQuote } from './interface/short-quote.interface';
import { StockPerformance } from './interface/stock-performance.interface';

@Injectable()
export class QuoteService {
  private readonly logger = new Logger(QuoteService.name);

  constructor(private readonly httpService: HttpService) {}

  getQuote(symbol: string) {
    return this.httpService.get<Quote[]>(ROUTES.FULL_QUOTE(symbol)).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        console.log(error);
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  getShortQuote(symbol: string) {
    return this.httpService.get<ShortQuote[]>(ROUTES.SHORT_QUOTE(symbol)).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        console.log(error);
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  getExchangeQuotes(exchange: string) {
    return this.httpService.get<Quote[]>(ROUTES.EXCHANGE_QUOTES(exchange)).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        console.log(error);
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  getStockPriceChange(symbol: string) {
    return this.httpService
      .get<StockPerformance[]>(ROUTES.STOCK_PRICE_CHANGE(symbol))
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          console.log(error);
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }
}
