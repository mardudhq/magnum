import { Types } from 'mongoose';

export interface ITicker {
  symbol: string;
  time: Date;
  price: Types.Decimal128;
  change: Types.Decimal128;
  changePercent: Types.Decimal128;
}
