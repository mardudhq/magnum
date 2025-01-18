import { Injectable, Logger, ValidationPipe } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TickerDto } from 'src/common/dto/ticker.dto';
import { Ticker } from './schemas/ticker.schema';

@Injectable()
export class TickerProcessorService {
  private readonly logger = new Logger(TickerProcessorService.name);
  private readonly validationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
  });

  constructor(
    @InjectModel(Ticker.name)
    private readonly tickerModel: Model<Ticker>,
  ) {}

  // TODO: implement custom param pipe
  // ...
  // Couldn't find a reliable way, might migrate this to
  // another nest microservice and use pipes & interceptors
  // there.
  @OnEvent('ticker.received')
  async handleTickerProcessing(payload: any) {
    try {
      const ticker = (await this.validationPipe.transform(payload, {
        type: 'body',
        metatype: TickerDto,
      })) as TickerDto;

      // Debugging
      console.log(
        `${ticker.time.toLocaleDateString()} ${ticker.time.toLocaleTimeString()}\t${ticker.id}\t${ticker.price.toFixed(2)}`,
      );
      await this.tickerModel.create(ticker);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        this.logger.error(`Failed to process ticker: ${error.message}`);
      }
    }
  }
}
