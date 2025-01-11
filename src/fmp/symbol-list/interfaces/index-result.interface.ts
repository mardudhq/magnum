import { SymbolResult } from './symbol-result.interface';

export interface IndexResult extends Pick<SymbolResult, 'symbol' | 'name'> {
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}
