import { Controller, Get, Param, Query } from '@nestjs/common';
import { HistoricalService } from './historical.service';
import { IntradayPaginationDto } from './dto/intraday-pagination.dto';
import { EodPaginationDto } from './dto/eod-pagination.dto';

@Controller('historical')
export class HistoricalController {
  constructor(private readonly historicalService: HistoricalService) {}

  @Get('/intraday/:timeframe/:symbol')
  getIntraday(
    @Param('timeframe') timeframe: string,
    @Param('symbol') symbol: string,
    @Query() intradayPaginationDto: IntradayPaginationDto,
  ) {
    return this.historicalService.getIntraday(
      timeframe,
      symbol,
      intradayPaginationDto,
    );
  }

  @Get('/eod/:symbol')
  getEod(
    @Param('symbol') symbol: string,
    @Query() eodPaginationDto: EodPaginationDto,
  ) {
    return this.historicalService.getEod(symbol, eodPaginationDto);
  }
}
