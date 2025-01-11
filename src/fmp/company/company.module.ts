/**
 * CompanyModule is all about companies information
 * and their values. In addition to all available
 * exchanges, sectors, and industries listed on FMP.
 */
import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
