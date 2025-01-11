/**
 * provides methods to fetch technical indicator data
 * for a given symbol and timeframe.
 */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { AxiosError } from 'axios';
import { TechnicalIndicatorTypeDto } from './dto/technical-indicator-type.dto';
import { ROUTES } from './technical-indicator.constant';

@Injectable()
export class TechnicalIndicatorService {
  private readonly logger = new Logger(TechnicalIndicatorService.name);

  constructor(private readonly httpService: HttpService) {}

  getTechnicalIndicator(
    timeframe: string,
    symbol: string,
    technicalIndicatorTypeDto: TechnicalIndicatorTypeDto,
  ) {
    const params = { ...technicalIndicatorTypeDto };
    return this.httpService
      .get<any[]>(ROUTES.TECHNICAL_INDICATOR()(timeframe)(symbol), { params })
      .pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          this.logger.error(error.message);
          throw new InternalServerErrorException('Something wrong happend.');
        }),
      );
  }
}
