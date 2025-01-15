/**
 * This module is for fetching quotes of a symbol
 * including summaries
 */
import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { CompanyRegistryModule } from 'src/company-registry/company-registry.module';

@Module({
  imports: [CompanyRegistryModule],
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
