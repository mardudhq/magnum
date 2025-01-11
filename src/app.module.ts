import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { FmpModule } from './fmp/fmp.module';

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
        },
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    FmpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
