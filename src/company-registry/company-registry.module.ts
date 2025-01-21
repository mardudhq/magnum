/**
 * CompanyRegistryModule is responsible for managing company information
 * for the app. It performs periodic check with Saudi Exchange latest listed
 * companies to stay in sync.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRegistryController } from './company-registry.controller';
import { CompanyRegistryService } from './company-registry.service';
import { CompanyRegistryScheduler } from './scheduler/company-registry.scheduler';
import {
  CompanyRegistry,
  CompanyRegistrySchema,
} from './schemas/company-registry.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyRegistry.name,
        schema: CompanyRegistrySchema,
      },
    ]),
  ],
  providers: [CompanyRegistryService, CompanyRegistryScheduler],
  controllers: [CompanyRegistryController],
  exports: [CompanyRegistryService],
})
export class CompanyRegistryModule {}
