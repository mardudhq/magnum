import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CompanyRegistryService } from '../company-registry.service';

@Injectable()
export class CompanyRegistryScheduler {
  private readonly logger = new Logger(CompanyRegistryScheduler.name);

  constructor(
    private readonly companyRegistryService: CompanyRegistryService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  async handleDailyTasks() {
    this.logger.log('====================================================');
    this.logger.log('Starting daily company registry tasks...');
    try {
      await this.companyRegistryService.performCompanyRegistryInsertion();
      await this.companyRegistryService.performCompanyRegistryDeactivation();
      this.logger.log('Completed daily company registry tasks.');
      this.logger.log('====================================================');
    } catch (error) {
      this.logger.fatal('Error during daily company registry tasks', error);
    }
  }
}
