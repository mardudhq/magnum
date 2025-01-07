import { Controller, Get, Param } from '@nestjs/common';
import { SymbolListService } from './symbol-list.service';

@Controller('symbol-list')
export class SymbolListController {
  constructor(private readonly symbolListService: SymbolListService) {}

  @Get('stock')
  listAllStocks() {
    return this.symbolListService.listAllStocks();
  }

  @Get('etf')
  listAllEtfs() {
    return this.symbolListService.listAllEtfs();
  }

  @Get('statement')
  listAllStatements() {
    return this.symbolListService.listAllStatements();
  }

  @Get('tradable')
  listAllTradables() {
    return this.symbolListService.listAllTradables();
  }

  @Get('exchange/:exchange')
  listExchangeSymbols(@Param('exchange') exchange: string) {
    return this.symbolListService.listExchangeSymbols(exchange);
  }

  @Get('index')
  listAllIndices() {
    return this.symbolListService.listAllIndices();
  }
}
