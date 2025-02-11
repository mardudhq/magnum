import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CompanyRegistryService } from './company-registry.service';

@Controller('company-registry')
export class CompanyRegistryController {
  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  @MessagePattern({ cmd: 'pull-company' })
  async pullCompanies(cmd: string) {
    return this.companyRegistryService.findAll();
  }
}
