import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Ticker extends Document {
  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  time: Date;

  @Prop({ required: true, type: Types.Decimal128 })
  price: Types.Decimal128;

  @Prop({ required: true, type: Types.Decimal128 })
  change: Types.Decimal128;

  @Prop({ required: true, type: Types.Decimal128 })
  changePercent: Types.Decimal128;
}

export const TickerSchema = SchemaFactory.createForClass(Ticker);
TickerSchema.index({ symbol: 1, time: 1 }, { unique: true });
