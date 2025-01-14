/**
 * CompanyRegistryModule is responsible for managing company information
 * for the app. It performs periodic check with Saudi Exchange latest listed
 * companies to stay in sync.
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CompanyRegistry,
  CompanyRegistrySchema,
} from './schemas/company-registry.schema';
import { CompanyRegistryService } from './company-registry.service';
import { CompanyRegistryController } from './company-registry.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompanyRegistry.name,
        schema: CompanyRegistrySchema,
      },
    ]),
  ],
  providers: [CompanyRegistryService],
  controllers: [CompanyRegistryController],
})
export class CompanyRegistryModule {}
