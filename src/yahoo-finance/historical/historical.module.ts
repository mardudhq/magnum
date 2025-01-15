import { Module } from '@nestjs/common';
import { HistoricalService } from './historical.service';
import { HistoricalController } from './historical.controller';
import { CompanyRegistryModule } from 'src/company-registry/company-registry.module';

@Module({
  imports: [CompanyRegistryModule],
  providers: [HistoricalService],
  controllers: [HistoricalController],
})
export class HistoricalModule {}
