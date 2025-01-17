import { Module } from '@nestjs/common';
import { TickerProcessorService } from './ticker-processor.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RealtimeStockData,
  RealtimeStockDataSchema,
} from 'src/data-feed/schemas/realtime-stock-data.schema';

@Module({
  providers: [TickerProcessorService],
  imports: [
    MongooseModule.forFeature([
      {
        name: RealtimeStockData.name,
        schema: RealtimeStockDataSchema,
      },
    ]),
  ],
})
export class TickerProcessorModule {}
