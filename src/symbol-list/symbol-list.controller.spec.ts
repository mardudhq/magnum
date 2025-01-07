import { Test, TestingModule } from '@nestjs/testing';
import { SymbolListController } from './symbol-list.controller';

describe('SymbolListController', () => {
  let controller: SymbolListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SymbolListController],
    }).compile();

    controller = module.get<SymbolListController>(SymbolListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
