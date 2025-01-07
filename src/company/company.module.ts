/**
 * CompanyModule is all about companies information
 * and their values. In addition to all available
 * exchanges, sectors, and industries listed on FMP.
 */
import { Module, ValidationPipe } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CommonModule } from 'src/common/common.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [CommonModule],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
})
export class CompanyModule {}
