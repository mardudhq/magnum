import { Test, TestingModule } from '@nestjs/testing';
import { DataFeedService } from './data-feed.service';

describe('DataFeedService', () => {
  let service: DataFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataFeedService],
    }).compile();

    service = module.get<DataFeedService>(DataFeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
