/**
 * HistoricalModule manages historical data operations and services.
 */
import { Module } from '@nestjs/common';
import { HistoricalController } from './historical.controller';
import { HistoricalService } from './historical.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [HistoricalController],
  providers: [HistoricalService],
})
export class HistoricalModule {}
