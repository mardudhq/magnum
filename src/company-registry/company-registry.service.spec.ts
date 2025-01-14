import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRegistryService } from './company-registry.service';

describe('CompanyRegistryService', () => {
  let service: CompanyRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRegistryService],
    }).compile();

    service = module.get<CompanyRegistryService>(CompanyRegistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
