/**
 * HistoricalModule manages historical data operations and services.
 */
import { Module, ValidationPipe } from '@nestjs/common';
import { HistoricalController } from './historical.controller';
import { HistoricalService } from './historical.service';
import { CommonModule } from '../common/common.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule],
  controllers: [HistoricalController],
  providers: [
    HistoricalService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
})
export class HistoricalModule {}
