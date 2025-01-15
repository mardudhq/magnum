import { Controller, Logger, Get, Param } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  private readonly logger = new Logger(QuoteController.name);

  constructor(private readonly quoteService: QuoteService) {}

  // TODO: Validation pipe
  @Get(':symbols')
  async quote(@Param('symbols') symbols: string) {
    return this.quoteService.quote(symbols.split(','));
  }
}
