import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalService } from './historical.service';

describe('HistoricalService', () => {
  let service: HistoricalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricalService],
    }).compile();

    service = module.get<HistoricalService>(HistoricalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
