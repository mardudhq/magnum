import { Module } from '@nestjs/common';
import { CompanyRegistryModule } from 'src/company-registry/company-registry.module';
import { DataFeedService } from './data-feed.service';

@Module({
  imports: [CompanyRegistryModule],
  providers: [DataFeedService],
})
export class DataFeedModule {}
