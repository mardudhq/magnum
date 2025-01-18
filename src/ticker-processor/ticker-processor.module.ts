import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticker, TickerSchema } from './schemas/ticker.schema';
import { TickerProcessorService } from './ticker-processor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ticker.name,
        schema: TickerSchema,
      },
    ]),
  ],
  providers: [TickerProcessorService],
})
export class TickerProcessorModule {}
