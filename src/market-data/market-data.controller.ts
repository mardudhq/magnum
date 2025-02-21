import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MarketDataService } from './market-data.service';

@Controller('market-data')
export class MarketDataController {
  constructor(private readonly marketDataService: MarketDataService) {}

  @MessagePattern('stock.request')
  getStockPrice(@Payload() stockDto: { symbol: string }) {
    return this.marketDataService.getStockPrice(stockDto.symbol);
  }
}
