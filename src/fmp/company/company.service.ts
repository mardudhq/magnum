/**
 * CompanyService encapsulates business logic related on
 * fetching companies information, screener criterias and
 * available exchanges.
 */
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, map, Observable } from 'rxjs';
import { ROUTES } from './company.constant';
import { CompanyProfile } from './interfaces/company-profile.interface';
import { StockScreenerDto } from './dto/stock-screener.dto';
import { StockScreenerResult } from './interfaces/stock-screener-result.interface';
import { ExecutiveProfile } from './interfaces/executive-profile.interface';
import { MarketCapResult } from './interfaces/market-cap-result.interface';
import { HistoricalMarketCapPaginationDto } from './dto/historical-market-cap-pagination.dto';
import { AnalEstimatesDto } from './dto/anal-estimates.dto';
import { AnalEstimatesResult } from './interfaces/anal-estimates-result.interface';
import { AnalRecommendResult } from './interfaces/anal-recommend-result.interface';
import { ExchangeTradingHour } from './interfaces/exchange-trading-hour.interface';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(private readonly httpService: HttpService) {}

  getCompanyProfile(symbol: string): Observable<CompanyProfile[]> {
    return this.httpService
      .get<CompanyProfile[]>(ROUTES.COMPANY_PROFILE(symbol))
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  screenStocks(
    stockScreenerDto: StockScreenerDto,
  ): Observable<StockScreenerResult[]> {
    const params = { ...stockScreenerDto };
    return this.httpService
      .get<StockScreenerResult[]>(ROUTES.SCREENER, { params })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  getExecutives(symbol: string): Observable<ExecutiveProfile[]> {
    return this.httpService
      .get<ExecutiveProfile[]>(ROUTES.EXECUTIVES(symbol))
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  getMarketCap(symbol: string): Observable<MarketCapResult[]> {
    return this.httpService
      .get<MarketCapResult[]>(ROUTES.MARKET_CAP(symbol))
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  getHistoricalMarketCap(
    symbol: string,
    historicalMarketCapPaginationDto: HistoricalMarketCapPaginationDto,
  ): Observable<MarketCapResult[]> {
    const params = { ...historicalMarketCapPaginationDto };
    console.log(params);
    return this.httpService
      .get<MarketCapResult[]>(ROUTES.HIST_MARKET_CAP(symbol), { params })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  getAllCountries(): Observable<string[]> {
    return this.httpService.get<string[]>(ROUTES.ALL_COUNTRIES).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  getAnalEstimates(
    symbol: string,
    analEstimatesDto: AnalEstimatesDto,
  ): Observable<AnalEstimatesResult[]> {
    const params = { ...analEstimatesDto };
    console.log(params);
    return this.httpService
      .get<AnalEstimatesResult[]>(ROUTES.ANAL_ESTIMATES(symbol), { params })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  getAnalRecommend(symbol: string): Observable<AnalRecommendResult[]> {
    return this.httpService
      .get<AnalRecommendResult[]>(ROUTES.ANAL_RECOMMEND(symbol))
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  getAllExchangesTradingHours(): Observable<ExchangeTradingHour[]> {
    return this.httpService
      .get<ExchangeTradingHour[]>(ROUTES.ALL_EXCHANGES_TRADING_HOURS)
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  getAllSectors(): Observable<string[]> {
    return this.httpService.get<string[]>(ROUTES.ALL_SECTORS).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  getAllIndustries(): Observable<string[]> {
    return this.httpService.get<string[]>(ROUTES.ALL_INDUSTRIES).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  getAllExchanges(): Observable<string[]> {
    return this.httpService.get<string[]>(ROUTES.ALL_EXCHANGES).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }
}
