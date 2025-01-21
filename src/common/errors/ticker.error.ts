export class TickerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = TickerError.name;
  }
}
