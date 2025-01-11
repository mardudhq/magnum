import { Test, TestingModule } from '@nestjs/testing';
import { TechnicalIndicatorController } from './technical-indicator.controller';
import { TechnicalIndicatorService } from './technical-indicator.service';

describe('TechnicalIndicatorController', () => {
  let controller: TechnicalIndicatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnicalIndicatorController],
      providers: [TechnicalIndicatorService],
    }).compile();

    controller = module.get<TechnicalIndicatorController>(TechnicalIndicatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
