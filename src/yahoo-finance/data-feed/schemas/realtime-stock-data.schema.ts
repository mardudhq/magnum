import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RealtimeStockData extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  exchange: string;

  @Prop({ required: true })
  quoteType: string;

  @Prop({ required: true })
  marketHours: string;

  @Prop({ required: true })
  changePercent: number;

  @Prop({ required: false })
  dayVolume?: number;

  @Prop({ required: true })
  change: number;

  @Prop({ required: false })
  lastSize?: number;

  @Prop({ required: true })
  priceHint: number;
}

export const RealtimeStockDataSchema =
  SchemaFactory.createForClass(RealtimeStockData);
