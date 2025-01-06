import { Module } from '@nestjs/common';
import { MarketDataService } from './market-data.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  FMP_API_KEY,
  FMP_API_VERSION,
  FMP_BASE_URL,
  FMP_SCHEMA,
} from 'src/config/config.constant';
import { MarketDataController } from './market-data.controller';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const schema = configService.get<string>(FMP_SCHEMA);
        const baseUrl = configService.get<string>(FMP_BASE_URL);
        const apiVersion = configService.get<string>(FMP_API_VERSION);
        const apiKey = configService.get<string>(FMP_API_KEY);
        const url = `${schema}://${baseUrl}/${apiVersion}/`;
        return {
          baseURL: url,
          timeout: 5000,
          maxRedirects: 5,
          params: { apikey: apiKey },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MarketDataService],
  providers: [MarketDataService],
  controllers: [MarketDataController],
})
export class MarketDataModule {}
