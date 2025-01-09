/**
 * responsible for defining the structure and dependencies
 * of the Technical Indicator feature.
 */
import { Module } from '@nestjs/common';
import { TechnicalIndicatorService } from './technical-indicator.service';
import { TechnicalIndicatorController } from './technical-indicator.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [TechnicalIndicatorController],
  providers: [TechnicalIndicatorService],
})
export class TechnicalIndicatorModule {}
