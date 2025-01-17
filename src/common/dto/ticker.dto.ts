import { Expose, Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class TickerDto {
  @Expose()
  @IsDate()
  @Transform(({ value }) => new Date(Number(value)), { toClassOnly: true })
  time: Date;

  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  exchange: string;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsNumber()
  change: number = 0;

  @Expose()
  @IsNumber()
  changePercent: number = 0;

  @Expose()
  @IsString()
  dayVolume: string = '';

  @Expose()
  @IsString()
  priceHint: string;
}
