export interface IRawTicker {
  time: Date;
  id: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  priceHint: string;
}
