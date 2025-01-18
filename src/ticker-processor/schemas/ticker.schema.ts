import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  timeseries: {
    timeField: 'time',
    metaField: 'id',
    granularity: 'seconds',
  },
})
export class Ticker extends Document {
  @Prop({ required: true })
  time: Date;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  exchange: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  change: number;

  @Prop({ required: true })
  changePercent: number;

  @Prop({ required: true })
  priceHint: string;
}

export const TickerSchema = SchemaFactory.createForClass(Ticker);
