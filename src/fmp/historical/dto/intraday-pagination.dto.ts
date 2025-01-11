import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class IntradayPaginationDto {
  @IsString()
  @IsOptional()
  from: string;

  @IsString()
  @IsOptional()
  to: string;

  @IsBoolean()
  @IsOptional()
  extended: boolean;
}
