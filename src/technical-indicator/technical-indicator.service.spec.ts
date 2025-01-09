import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalIndicatorService } from './technical-indicator.service';

describe('TechnicalIndicatorService', () => {
  let service: TechnicalIndicatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnicalIndicatorService],
    }).compile();

    service = module.get<TechnicalIndicatorService>(TechnicalIndicatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
