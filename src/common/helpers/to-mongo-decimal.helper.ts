import Decimal from 'decimal.js';
import { Types } from 'mongoose';

export const toDecimal128 = (value: string | number) =>
  Types.Decimal128.fromString(new Decimal(value).toFixed(2));
