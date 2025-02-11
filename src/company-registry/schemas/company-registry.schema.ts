import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { toDecimal128 } from 'src/common/helpers/to-mongo-decimal.helper';

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

  @Prop({ required: false, type: Types.Decimal128, default: toDecimal128(0) })
  lastPrice?: Types.Decimal128;

  @Prop({ required: false, default: new Date(0) })
  lastPriceAt?: Date;

  @Prop({ required: false, type: Types.Decimal128, default: toDecimal128(0) })
  change?: Types.Decimal128;

  @Prop({ required: false, type: Types.Decimal128, default: toDecimal128(0) })
  changePercent?: Types.Decimal128;
}

export const CompanyRegistrySchema =
  SchemaFactory.createForClass(CompanyRegistry);
