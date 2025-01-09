import { Controller, Get, Param } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get(':symbol')
  getQuote(@Param('symbol') symbol: string) {
    return this.quoteService.getQuote(symbol);
  }

  @Get('/short/:symbol')
  getShortQuote(@Param('symbol') symbol: string) {
    return this.quoteService.getShortQuote(symbol);
  }

  @Get('/exchange/:exchange')
  getExchangeQuotes(@Param('exchange') symbol: string) {
    return this.quoteService.getExchangeQuotes(symbol);
  }

  @Get('/stock-price-change/:symbol')
  getStockPriceChange(@Param('symbol') symbol: string) {
    return this.quoteService.getStockPriceChange(symbol);
  }

  @Get('/market-performance/all')
  getMarketsPerformance() {
    return this.quoteService.getMarketsPerformance();
  }
}
