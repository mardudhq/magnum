/**
 * QuoteModule keeps track of the latest security
 * price, traded volume etc.
 */

import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
