import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CompanySearchDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  exchange?: string;
}
