import { Test, TestingModule } from '@nestjs/testing';
import { SymbolListService } from './symbol-list.service';

describe('SymbolListService', () => {
  let service: SymbolListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SymbolListService],
    }).compile();

    service = module.get<SymbolListService>(SymbolListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
