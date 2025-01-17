import { Test, TestingModule } from '@nestjs/testing';
import { TickerProcessorService } from './ticker-processor.service';

describe('TickerProcessorService', () => {
  let service: TickerProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TickerProcessorService],
    }).compile();

    service = module.get<TickerProcessorService>(TickerProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
