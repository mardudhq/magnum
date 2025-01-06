import { Module } from '@nestjs/common';
import { MarketDataService } from './market-data.service';

@Module({
  providers: [MarketDataService],
})
export class MarketDataModule {}
