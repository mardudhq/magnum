/**
 * SymbolListModule responsible for pulling the available
 * securites, ETFs, statements, and indices in
 * FMP database.
 */
import { Module } from '@nestjs/common';
import { SymbolListController } from './symbol-list.controller';
import { SymbolListService } from './symbol-list.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [SymbolListController],
  providers: [SymbolListService],
})
export class SymbolListModule {}
