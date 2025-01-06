import { Controller, Get, Param } from '@nestjs/common';
import { MarketDataService } from './market-data.service';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  @Get()
  main() {
    return { message: MarketDataController.name };
  }

  @Get(':symbol')
  quote(@Param('symbol') symbol: string) {
    return this.marketDataService.quote(symbol);
  }
}
