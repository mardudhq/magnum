import { IsEnum, IsNumber, Max, Min } from 'class-validator';

export enum TechnicalIndicatorType {
  SMA = 'sma',
  EMA = 'ema',
  WMA = 'wma',
  DEMA = 'dema',
  TEMA = 'tema',
  WILLIAMS = 'williams',
  RSI = 'rsi',
  ADX = 'adx',
  STANDARD_DEVIATION = 'standarddeviation',
}

export class TechnicalIndicatorTypeDto {
  @IsEnum(TechnicalIndicatorType)
  type: TechnicalIndicatorType;

  @IsNumber()
  @Min(1)
  @Max(500)
  period: number;
}
