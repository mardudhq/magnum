import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'company_registries' })
export class CompanyRegistry extends Document {
  @Prop({ required: true, unique: true })
  symbol: string;

  @Prop({ required: true })
  nameAr: string;

  @Prop({ required: true })
  nameEn: string;

  @Prop({ required: true })
  tradingNameAr: string;

  @Prop({ required: true })
  tradingNameEn: string;

  @Prop({ required: true })
  sectorAr: string;

  @Prop({ required: true })
  sectorEn: string;

  @Prop({ required: true, unique: true })
  isin: string;

  @Prop({ required: true })
  marketType: string;

  @Prop({ required: true })
  profileUrl: string;

  @Prop({ required: false, default: true })
  isActive?: boolean;

  @Prop({ required: false, type: Types.Decimal128 })
  lastPrice?: Types.Decimal128;

  @Prop({ required: false })
  lastPriceAt?: Date;

  @Prop({ required: false, type: Types.Decimal128 })
  change?: Types.Decimal128;

  @Prop({ required: false, type: Types.Decimal128 })
  changePercent?: Types.Decimal128;
}

export const CompanyRegistrySchema =
  SchemaFactory.createForClass(CompanyRegistry);
