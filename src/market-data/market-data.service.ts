import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyRegistry } from '../company-registry/schemas/company-registry.schema';

@Injectable()
export class MarketDataService {
  private readonly logger = new Logger(MarketDataService.name);
  constructor(
    @InjectModel(CompanyRegistry.name)
    private readonly companyRegisteryModel: Model<CompanyRegistry>,
  ) {}

  async getStockPrice(stock: string) {
    const result = await this.companyRegisteryModel.findOne(
      { symbol: stock },
      { lastPrice: 1, lastPriceAt: 1, _id: 0 },
    );

    if (!result) {
      return null;
    }

    return {
      lastPrice: result.lastPrice.toString(),
      lastPriceAt: result.lastPriceAt,
    };
  }
}
