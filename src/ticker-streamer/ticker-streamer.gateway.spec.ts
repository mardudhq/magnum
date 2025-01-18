import { Test, TestingModule } from '@nestjs/testing';
import TickerStreamerGateway from './ticker-streamer.gateway';

describe('TickerStreamerGateway', () => {
  let gateway: TickerStreamerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TickerStreamerGateway],
    }).compile();

    gateway = module.get<TickerStreamerGateway>(TickerStreamerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
