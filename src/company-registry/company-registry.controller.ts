import { Controller, Get } from '@nestjs/common';
import { CompanyRegistryService } from './company-registry.service';

@Controller('company-registry')
export class CompanyRegistryController {
  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  @Get()
  async _experimental_comapany_registry_insertion() {
    await this.companyRegistryService.performCompanyRegistryInsertion();
    await this.companyRegistryService.performCompanyRegistryDeactivation();
  }
}
