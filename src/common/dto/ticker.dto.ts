import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class TickerDto {
  @IsDate()
  @Transform(({ value }) => new Date(Number(value)), { toClassOnly: true })
  time: Date;

  @IsString()
  id: string;

  @IsString()
  exchange: string;

  @IsNumber()
  price: number;

  @IsNumber()
  change: number = 0;

  @IsNumber()
  changePercent: number = 0;

  @IsString()
  priceHint: string;
}
