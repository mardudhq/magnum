import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCompanyRegistryDto {
  @IsString()
  symbol: string;
  @IsString()
  nameAr: string;

  @IsString()
  nameEn: string;

  @IsString()
  tradingNameAr: string;

  @IsString()
  tradingNameEn: string;

  @IsString()
  sectorAr: string;

  @IsString()
  sectorEn: string;

  @IsString()
  isin: string;

  @IsString()
  marketType: string;

  @IsString()
  profileUrl: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
