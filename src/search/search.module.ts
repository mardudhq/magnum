/**
 * SearchModule handles all search-related functionality
 * for market data lookups.
 */
import { Module, ValidationPipe } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { CommonModule } from 'src/common/common.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule],
  controllers: [SearchController],
  providers: [
    SearchService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
  exports: [SearchService],
})
export class SearchModule {}
