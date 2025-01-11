import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
} from 'class-validator';

const REGEX_DATE_ERROR = 'Date must be in the format YYYY-MM-DD';

export class HistoricalMarketCapPaginationDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: REGEX_DATE_ERROR })
  from: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: REGEX_DATE_ERROR })
  to: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number;
}
