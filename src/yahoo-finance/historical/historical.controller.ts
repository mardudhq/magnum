import { Controller, Get, Logger, Param } from '@nestjs/common';
import { HistoricalService } from './historical.service';

@Controller('historical')
export class HistoricalController {
  private readonly logger = new Logger(HistoricalController.name);

  constructor(private readonly historicalService: HistoricalService) {}

  @Get(':symbol')
  getHistoricalBySymbol(@Param('symbol') symbol: string) {
    return this.historicalService.getHistoricalBySymbol(symbol, {
      period1: new Date(2000, 0, 1),
    });
  }
}
