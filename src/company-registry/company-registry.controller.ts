import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CompanyRegistryService } from './company-registry.service';
import { SyncCompanies } from './interfaces/sync-companies.interface';

/**
 * Magnum's company registry controller
 *
 * This controller only exposes a gRPC endpoint
 * to be consumed by Mardud.
 *
 * It returns the latest companies in its registry
 * with their latest price, change, change percentile.
 */
@Controller('company-registry')
export class CompanyRegistryController {
  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  @GrpcMethod('CompanyService')
  async syncCompanies(): Promise<{ companies: SyncCompanies[] }> {
    const companies = (await this.companyRegistryService.findAll({
      profileUrl: 0,
      __v: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
    })) as SyncCompanies[];

    return { companies };
  }
}
