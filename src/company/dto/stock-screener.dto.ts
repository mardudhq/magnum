import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class StockScreenerDto {
  @IsString() @IsNotEmpty() country: string;
  @IsOptional() @IsString() exchange?: string;
  @IsOptional() @IsNumber() @IsPositive() limit?: number;

  @IsOptional() @IsBoolean() isEtf?: boolean;
  @IsOptional() @IsBoolean() isFund?: boolean;
  @IsOptional() @IsBoolean() isActivelyTrading?: boolean;

  @IsOptional() @IsString() sector?: string;
  @IsOptional() @IsString() industry?: string;

  @IsOptional() @IsNumber() marketCapMoreThan?: number;
  @IsOptional() @IsNumber() marketCapLowerThan?: number;
  @IsOptional() @IsNumber() priceMoreThan?: number;
  @IsOptional() @IsNumber() priceLowerThan?: number;
  @IsOptional() @IsNumber() betaMoreThan?: number;
  @IsOptional() @IsNumber() betaLowerThan?: number;
  @IsOptional() @IsNumber() volumeMoreThan?: number;
  @IsOptional() @IsNumber() volumeLowerThan?: number;
  @IsOptional() @IsNumber() dividendMoreThan?: number;
  @IsOptional() @IsNumber() dividendLowerThan?: number;
}
