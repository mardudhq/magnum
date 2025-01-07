import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';

export enum Period {
  ANNUAL = 'annual',
  QUARTER = 'quarter',
}

export class AnalEstimatesDto {
  @IsEnum(Period)
  @IsOptional()
  period: Period;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit: number;
}
