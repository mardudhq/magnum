import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CompanyRegistryService } from './company-registry.service';

@Controller('company-registry')
export class CompanyRegistryController {
  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  @MessagePattern({ cmd: 'sync-companies' })
  async syncCompanies() {
    return this.companyRegistryService.findAll({
      profileUrl: 0,
      __v: 0,
      _id: 0,
    });
  }
}
