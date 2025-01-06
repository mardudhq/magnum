import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, map } from 'rxjs';

@Injectable()
export class MarketDataService implements OnModuleInit {
  private readonly logger = new Logger(MarketDataService.name);

  constructor(private readonly httpService: HttpService) {}

  quote(symbol: string) {
    return this.httpService.get(`/quote-short/${symbol}`).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }

  onModuleInit() {
    this.logger.debug(`${MarketDataService.name}.init`);
  }
}
