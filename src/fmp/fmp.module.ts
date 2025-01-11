import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { HistoricalModule } from './historical/historical.module';
import { QuoteModule } from './quote/quote.module';
import { SearchModule } from './search/search.module';
import { SymbolListModule } from './symbol-list/symbol-list.module';
import { TechnicalIndicatorModule } from './technical-indicator/technical-indicator.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    CompanyModule,
    HistoricalModule,
    QuoteModule,
    SearchModule,
    SymbolListModule,
    TechnicalIndicatorModule,
    RouterModule.register([
      {
        path: 'fmp',
        children: [
          CompanyModule,
          HistoricalModule,
          QuoteModule,
          SearchModule,
          SymbolListModule,
          TechnicalIndicatorModule,
        ],
      },
    ]),
  ],
})
export class FmpModule {}
