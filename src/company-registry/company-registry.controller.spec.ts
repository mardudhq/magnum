import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRegistryController } from './company-registry.controller';

describe('CompanyRegistryController', () => {
  let controller: CompanyRegistryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyRegistryController],
    }).compile();

    controller = module.get<CompanyRegistryController>(CompanyRegistryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
