import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CompanyRegistry,
  CompanyRegistrySchema,
} from '../company-registry/schemas/company-registry.schema';
import { MarketDataController } from './market-data.controller';
import { MarketDataService } from './market-data.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyRegistry.name,
        schema: CompanyRegistrySchema,
      },
    ]),
  ],
  controllers: [MarketDataController],
  providers: [MarketDataService],
})
export class MarketDataModule {}
