import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { FmpModule } from './fmp/fmp.module';
import { CompanyRegistryModule } from './company-registry/company-registry.module';
import { ScheduleModule } from '@nestjs/schedule';
import { YahooFinanceModule } from './yahoo-finance/yahoo-finance.module';
import { WebSocketModule } from 'nestjs-websocket';
import { DataFeedModule } from './data-feed/data-feed.module';
import { TickerProcessorModule } from './ticker-processor/ticker-processor.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
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
        },
      }),
      inject: [ConfigService],
    }),
    WebSocketModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('YF_SERVER_URL'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    CommonModule,
    FmpModule,
    CompanyRegistryModule,
    YahooFinanceModule,
    DataFeedModule,
    TickerProcessorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
