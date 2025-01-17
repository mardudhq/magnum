import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RealtimeStockData,
  RealtimeStockDataSchema,
} from 'src/data-feed/schemas/realtime-stock-data.schema';
import { TickerProcessorService } from './ticker-processor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RealtimeStockData.name,
        schema: RealtimeStockDataSchema,
      },
    ]),
  ],
  providers: [TickerProcessorService],
})
export class TickerProcessorModule {}
