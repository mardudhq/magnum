import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { SymbolListModule } from './symbol-list/symbol-list.module';
import { CompanyModule } from './company/company.module';
import { QuoteModule } from './quote/quote.module';
import { HistoricalModule } from './historical/historical.module';
import { TechnicalIndicatorModule } from './technical-indicator/technical-indicator.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        onConnectionCreate: (connection: Connection) => {
          connection.on('connected', () =>
            Logger.log('MongoDB CONNECTED', AppModule.name),
          );
          connection.on('open', () =>
            Logger.log('MongoDB OPEN', AppModule.name),
          );
          connection.on('disconnected', () =>
            Logger.log('MongoDB DISCONNECTED', AppModule.name),
          );
          connection.on('reconnected', () =>
            Logger.log('MongoDB RECONNECTED', AppModule.name),
          );
          connection.on('disconnecting', () =>
            Logger.log('MongoDB DISCONNECTING', AppModule.name),
          );
        },
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    SearchModule,
    SymbolListModule,
    CompanyModule,
    QuoteModule,
    HistoricalModule,
    TechnicalIndicatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
