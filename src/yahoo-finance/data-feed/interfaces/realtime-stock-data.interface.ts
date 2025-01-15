export interface IRealtimeStockData {
  id: string;
  price: number;
  time: Date;
  exchange: string;
  quoteType: string;
  marketHours: string;
  changePercent: number;
  dayVolume?: number;
  change: number;
  lastSize?: number;
  priceHint: number;
}
