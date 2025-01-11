/**
 * SearchService handles search operations for market data lookups.
 * It provides methods to search by general criteria, ticker, or company name.
 */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ROUTES, ROUTES_VALUES } from './search.constant';
import { catchError, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { CompanySearchDto } from './dto/company-search.dto';
import { CompanySearchResult } from './interfaces/company-search-result.interface';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly httpService: HttpService) {}

  searchByGeneralCriteria(companySearchDto: CompanySearchDto) {
    return this.performSearch(ROUTES.GENERAL_SEARCH, companySearchDto);
  }

  searchByTicker(companySearchDto: CompanySearchDto) {
    return this.performSearch(ROUTES.TICKER_SEARCH, companySearchDto);
  }

  searchByCompanyName(companySearchDto: CompanySearchDto) {
    return this.performSearch(ROUTES.NAME_SEARCH, companySearchDto);
  }

  private performSearch(
    route: ROUTES_VALUES,
    companySearchDto: CompanySearchDto,
  ) {
    const params = { ...companySearchDto };
    return this.httpService.get<CompanySearchResult[]>(route, { params }).pipe(
      map((res) => res.data),
      catchError((error: AxiosError) => {
        this.logger.error(error.message);
        throw new InternalServerErrorException('Something wrong happend.');
      }),
    );
  }
}
