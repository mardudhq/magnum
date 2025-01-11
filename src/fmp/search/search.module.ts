/**
 * SearchModule handles all search-related functionality
 * for market data lookups.
 */
import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
