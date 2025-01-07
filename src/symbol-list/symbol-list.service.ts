/**
 * SymbolListService lists all the available securities, indices
 * statement in FMP database.
 */
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ROUTES } from './symbol-list.constant';
import { catchError, map } from 'rxjs';
import { AxiosError } from 'axios';
import { SymbolResult } from './interfaces/symbol-result.interface';
import { ExchangeSymbol } from './interfaces/exchange-symbol.interface';
import { IndexResult } from './interfaces/index-result.interface';

@Injectable()
export class SymbolListService {
  private readonly logger = new Logger(SymbolListService.name);
  constructor(private readonly httpService: HttpService) {}

  listAllStocks() {
    return this.httpService.get<SymbolResult[]>(ROUTES.ALL_STOCK_LIST).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        console.log(error);
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  listAllEtfs() {
    return this.httpService.get<SymbolResult[]>(ROUTES.ALL_ETF_LIST).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        console.log(error);
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  listAllStatements() {
    return this.httpService.get<string[]>(ROUTES.STATEMENT_LIST).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        console.log(error);
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  listAllTradables() {
    return this.httpService.get<SymbolResult[]>(ROUTES.TRADABLE_LIST).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        console.log(error);
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  listExchangeSymbols(exchange: string) {
    return this.httpService
      .get<ExchangeSymbol[]>(ROUTES.EXCHANGE_LIST(exchange))
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          console.log(error);
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  listAllIndices() {
    return this.httpService.get<IndexResult[]>(ROUTES.INDEX_LIST).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        console.log(error);
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }
}
