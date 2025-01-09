import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { SymbolListModule } from './symbol-list/symbol-list.module';
import { CompanyModule } from './company/company.module';
import { QuoteModule } from './quote/quote.module';
import { HistoricalModule } from './historical/historical.module';
import { TechnicalIndicatorModule } from './technical-indicator/technical-indicator.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommonModule,
    SearchModule,
    SymbolListModule,
    CompanyModule,
    QuoteModule,
    HistoricalModule,
    TechnicalIndicatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
