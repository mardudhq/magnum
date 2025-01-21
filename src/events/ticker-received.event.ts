export class TickerReceivedEvent {
  time: Date;
  id: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  priceHint: string;

  constructor(
    time: Date,
    id: string,
    exchange: string,
    price: number,
    change: number = 0,
    changePercent: number = 0,
    priceHint: string,
  ) {
    this.time = time;
    this.id = id;
    this.exchange = exchange;
    this.price = price;
    this.change = change;
    this.changePercent = changePercent;
    this.priceHint = priceHint;
  }
}
