/**
 * HistoricalService handles fetching and processing historical stock data,
 * supporting intraday and end-of-day charts.
 */
import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IntradayPaginationDto } from './dto/intraday-pagination.dto';
import { StockCandle } from './interface/stock-candle.interface';
import { catchError, map } from 'rxjs';
import { AxiosError } from 'axios';
import { ROUTES } from './historical.constant';
import { EodPaginationDto } from './dto/eod-pagination.dto';
import { StockEod } from './interface/stock-eod.interface';

@Injectable()
export class HistoricalService {
  private readonly logger = new Logger(HistoricalService.name);

  constructor(private readonly httpService: HttpService) {}

  getIntraday(
    timeframe: string,
    symbol: string,
    intradayPaginationDto: IntradayPaginationDto,
  ) {
    const params = { ...intradayPaginationDto };
    return this.httpService
      .get<
        StockCandle[]
      >(ROUTES.INTRADAY_CHART()(timeframe)(symbol), { params })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }

  getEod(symbol: string, eodPaginationDto: EodPaginationDto) {
    const params = { ...eodPaginationDto };
    return this.httpService
      .get<StockEod>(ROUTES.EOD_CHART(symbol), { params })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }
}
