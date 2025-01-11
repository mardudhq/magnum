import { IsOptional, IsString } from 'class-validator';

export class EodPaginationDto {
  @IsString()
  @IsOptional()
  from: string;

  @IsString()
  @IsOptional()
  to: string;

  @IsString()
  @IsOptional()
  serietype: string;
}
