import { Controller, Get } from '@nestjs/common';
import { CompanyRegistryService } from './company-registry.service';

@Controller('company-registry')
export class CompanyRegistryController {
  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  // FOR TESTING PURPOSE
  // REMOVE IT
  @Get()
  async _this_is_for_testing_service_methods_remove_it_later() {
    await this.companyRegistryService.performCompanyRegistryInsertion();
    await this.companyRegistryService.performCompanyRegistryDeactivation();
  }
}
