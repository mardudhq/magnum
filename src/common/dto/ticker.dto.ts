import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator';

export class TickerDto {
  @IsDate()
  @Transform(({ value }) => new Date(Number(value)), { toClassOnly: true })
  time: Date;

  @IsString()
  id: string;

  @IsString()
  exchange: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  change: number = 0;

  @IsNumber()
  changePercent: number = 0;

  @IsNumber()
  @IsPositive()
  dayVolume: number = 0;

  @IsNumber()
  priceHint: number;
}
