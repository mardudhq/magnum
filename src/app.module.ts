import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { CompanyRegistryModule } from './company-registry/company-registry.module';
import { DataFeedModule } from './data-feed/data-feed.module';
import { FmpModule } from './fmp/fmp.module';
import { TickerProcessorModule } from './ticker-processor/ticker-processor.module';
import { TickerStreamerModule } from './ticker-streamer/ticker-streamer.module';
import { YahooFinanceModule } from './yahoo-finance/yahoo-finance.module';

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
    EventEmitterModule.forRoot(),
    CommonModule,
    FmpModule,
    CompanyRegistryModule,
    YahooFinanceModule,
    DataFeedModule,
    TickerProcessorModule,
    TickerStreamerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
