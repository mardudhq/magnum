import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRegistryModule } from 'src/company-registry/company-registry.module';
import { TickerReceivedListener } from './listeners/ticker-received.listener';
import { TickerProcessorScheduler } from './scheduler/ticker-processor.scheduler';
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
    CompanyRegistryModule,
  ],
  providers: [
    TickerProcessorService,
    TickerReceivedListener,
    TickerProcessorScheduler,
  ],
})
export class TickerProcessorModule {}
