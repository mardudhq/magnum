import { IRawTicker } from 'src/common/interfaces/raw-ticker.interface';

export class TickerReceivedEvent {
  time: Date;
  id: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  priceHint: string;

  constructor(rawTicker: IRawTicker) {
    Object.assign(this, rawTicker);
  }
}
