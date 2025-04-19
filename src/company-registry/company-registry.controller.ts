import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CompanyRegistryService } from './company-registry.service';
import { ISyncCompany } from './interfaces/sync-company.interface';

/**
 * Magnum's company registry controller
 *
 * This controller only exposes a gRPC endpoint
 * to be consumed by Mardud.
 *
 * It returns the latest companies in its registry
 * with their latest price, change, change percentile.
 */
@Controller('company')
export class CompanyRegistryController {
  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  @Get()
  findAll() {
    return this.companyRegistryService.findAll();
  }

  @Get('trigger-refresh')
  async triggerRefresh() {
    await this.companyRegistryService.performCompanyRegistryInsertion();
    await this.companyRegistryService.performCompanyRegistryDeactivation();
  }

  @GrpcMethod('CompanyService')
  async syncCompanies(): Promise<{ companies: ISyncCompany[] }> {
    const companies = await this.companyRegistryService.findAllSyncCompanies();
    return { companies };
  }
}
