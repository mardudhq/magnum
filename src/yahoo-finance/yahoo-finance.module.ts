import { Module } from '@nestjs/common';
import { HistoricalModule } from './historical/historical.module';
import { RouterModule } from '@nestjs/core';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [
    HistoricalModule,
    QuoteModule,
    RouterModule.register([
      {
        path: 'yf',
        children: [HistoricalModule, QuoteModule],
      },
    ]),
  ],
})
export class YahooFinanceModule {}
