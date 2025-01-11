import { Controller, Get, Param, Query } from '@nestjs/common';
import { TechnicalIndicatorService } from './technical-indicator.service';
import { TechnicalIndicatorTypeDto } from './dto/technical-indicator-type.dto';

@Controller('technical-indicator')
export class TechnicalIndicatorController {
  constructor(
    private readonly technicalIndicatorService: TechnicalIndicatorService,
  ) {}

  @Get(':timeframe/:symbol')
  getTechnicalIndicator(
    @Param('timeframe') timeframe: string,
    @Param('symbol') symbol: string,
    @Query() technicalIndicatorTypeDto: TechnicalIndicatorTypeDto,
  ) {
    return this.technicalIndicatorService.getTechnicalIndicator(
      timeframe,
      symbol,
      technicalIndicatorTypeDto,
    );
  }
}
