import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyRegistryModule } from 'src/company-registry/company-registry.module';
import { DataFeedService } from './data-feed.service';
import { WsManagerService } from './ws-manager.service';

@Module({
  imports: [CompanyRegistryModule, ConfigModule],
  providers: [DataFeedService, WsManagerService],
})
export class DataFeedModule {}
