import { Controller, Get, Param, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { StockScreenerDto } from './dto/stock-screener.dto';
import { HistoricalMarketCapPaginationDto } from './dto/historical-market-cap-pagination.dto';
import { AnalEstimatesDto } from './dto/anal-estimates.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('profile/:symbol')
  getCompanyProfile(@Param('symbol') symbol: string) {
    return this.companyService.getCompanyProfile(symbol);
  }

  @Get('screener')
  screenStocks(@Query() stockScreenerDto: StockScreenerDto) {
    return this.companyService.screenStocks(stockScreenerDto);
  }

  @Get('market-cap/:symbol')
  getMarketCap(@Param('symbol') symbol: string) {
    return this.companyService.getMarketCap(symbol);
  }

  @Get('historical-market-cap/:symbol')
  getHistoricalMarketCap(
    @Param('symbol') symbol: string,
    @Query() historicalMarketCapPaginationDto: HistoricalMarketCapPaginationDto,
  ) {
    return this.companyService.getHistoricalMarketCap(
      symbol,
      historicalMarketCapPaginationDto,
    );
  }

  @Get('analyst-estimates/:symbol')
  getAnalEstimates(
    @Param('symbol') symbol: string,
    @Query() analEstimatesDto: AnalEstimatesDto,
  ) {
    return this.companyService.getAnalEstimates(symbol, analEstimatesDto);
  }

  @Get('analyst-recommendations/:symbol')
  getAnalRecommend(@Param('symbol') symbol: string) {
    return this.companyService.getAnalRecommend(symbol);
  }

  @Get('is-exchange-open-all')
  getAllExchangesTradingHours() {
    return this.companyService.getAllExchangesTradingHours();
  }

  @Get('all-sectors')
  getAllSectors() {
    return this.companyService.getAllSectors();
  }

  @Get('all-industries')
  getAllIndustries() {
    return this.companyService.getAllIndustries();
  }

  @Get('all-exchanges')
  getAllExchanges() {
    return this.companyService.getAllExchanges();
  }
}
