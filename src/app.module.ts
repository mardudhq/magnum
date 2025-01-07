import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [ConfigModule.forRoot(), CommonModule, SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
