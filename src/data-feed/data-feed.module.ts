import { Module } from '@nestjs/common';
import { DataFeedService } from './data-feed.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RealtimeStockData,
  RealtimeStockDataSchema,
} from './schemas/realtime-stock-data.schema';
import { CompanyRegistryModule } from 'src/company-registry/company-registry.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RealtimeStockData.name,
        schema: RealtimeStockDataSchema,
      },
    ]),
    CompanyRegistryModule,
  ],
  providers: [DataFeedService],
})
export class DataFeedModule {}
