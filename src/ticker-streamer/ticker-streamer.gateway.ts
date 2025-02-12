/**
 * Ticker Streamer Gateway is a WebSocket server listener.
 * It provides an interface for external clients (e.g., web, mobile, console) to consume tickers
 * of interest from the engine.
 */

import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ITicker } from 'src/common/interfaces/ticker.interface';
import { TICKER_PROCESSED_EVENT } from 'src/events/events.constant';

@WebSocketGateway()
export default class TickerStreamerGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(TickerStreamerGateway.name);
  // TODO: Utilize Redis adapter
  private subscriptions: Map<string, string[]> = new Map();

  @WebSocketServer()
  server: Server;

  constructor() {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.subscriptions.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  /**
   * This register clients for tickers they requested for update
   * into a map of subscriptions.
   *
   * TODO: Leverage Redis adapter to handle clients,
   * and shoehorn the incoming message body to a validation pipe.
   */
  @SubscribeMessage('ticker')
  handleTickerSubscription(
    @MessageBody() data: { symbols: string[] },
    @ConnectedSocket() client: Socket,
  ) {
    const { symbols } = data;

    this.subscriptions.set(client.id, symbols);
    this.logger.log(`Client ${client.id} subscribed to [${symbols.join(',')}]`);
    console.log(this.subscriptions);
  }

  /**
   * Listen for ticker.processed events (emitted from ticker processor).
   */
  @OnEvent(TICKER_PROCESSED_EVENT)
  async handleTickerStreaming(ticker: ITicker) {
    this.subscriptions.forEach(async (symbols, clientId) => {
      if (symbols.indexOf(ticker.symbol) !== -1) {
        const client = this.server.sockets.sockets.get(clientId);
        if (client)
          client.emit('ticker', {
            ...ticker,
            price: ticker.price.toString(),
            change: ticker.change.toString(),
            changePercent: ticker.changePercent.toString(),
          });
      }
    });
  }
}
