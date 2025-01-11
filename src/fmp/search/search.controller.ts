import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { CompanySearchDto } from './dto/company-search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('general')
  searchByGeneralCriteria(@Query() companySearchDto: CompanySearchDto) {
    return this.searchService.searchByGeneralCriteria(companySearchDto);
  }

  @Get('company')
  searchByCompanyName(@Query() companySearchDto: CompanySearchDto) {
    return this.searchService.searchByCompanyName(companySearchDto);
  }

  @Get('ticker')
  searchByTicker(@Query() companySearchDto: CompanySearchDto) {
    return this.searchService.searchByTicker(companySearchDto);
  }
}
