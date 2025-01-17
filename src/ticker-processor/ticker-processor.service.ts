import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Model } from 'mongoose';
import { TickerDto } from 'src/common/dto/ticker.dto';
import { RealtimeStockData } from 'src/data-feed/schemas/realtime-stock-data.schema';

@Injectable()
export class TickerProcessorService {
  private readonly logger = new Logger(TickerProcessorService.name);

  constructor(
    @InjectModel(RealtimeStockData.name)
    private readonly realtimeStockDataModel: Model<RealtimeStockData>,
  ) {}

  @OnEvent('ticker.received')
  async handleTickerProcessing(payload: any) {
    try {
      const ticker = plainToInstance(TickerDto, payload, {
        excludeExtraneousValues: true,
      });
      await validateOrReject(ticker);
      console.log(
        `${ticker.time.toLocaleDateString()} ${ticker.time.toLocaleTimeString()}\t${ticker.id}\t${ticker.price.toFixed(2)}`,
      );
      await this.realtimeStockDataModel.create(ticker);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        this.logger.error(`Failed to process ticker: ${error.message}`);
      }
    }
  }
}
