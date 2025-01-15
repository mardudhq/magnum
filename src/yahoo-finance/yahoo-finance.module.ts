import { Module } from '@nestjs/common';
import { HistoricalModule } from './historical/historical.module';
import { RouterModule } from '@nestjs/core';
import { QuoteModule } from './quote/quote.module';
import { DataFeedModule } from './data-feed/data-feed.module';

@Module({
  imports: [
    HistoricalModule,
    QuoteModule,
    DataFeedModule,
    RouterModule.register([
      {
        path: 'yf',
        children: [HistoricalModule, QuoteModule],
      },
    ]),
  ],
})
export class YahooFinanceModule {}
