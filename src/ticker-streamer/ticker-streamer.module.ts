import { Module } from '@nestjs/common';
import TickerStreamerGateway from './ticker-streamer.gateway';

@Module({
  providers: [TickerStreamerGateway],
})
export class TickerStreamerModule {}
