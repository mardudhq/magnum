/**
 * Defines the FMP API routes for quotes endpoints
 * on an object, to preserve consistency of the codebase.
 */

export const ROUTES = {
  FULL_QUOTE: (symbol: string) => `/quote/:symbol`.replace(/:symbol/, symbol),
  SHORT_QUOTE: (symbol: string) =>
    `/quote-short/:symbol`.replace(/:symbol/, symbol),
  EXCHANGE_QUOTES: (exchange: string) =>
    `/quotes/:exchange`.replace(/:exchange/, exchange),
  STOCK_PRICE_CHANGE: (symbol: string) =>
    `/stock-price-change/:symbol`.replace(/:symbol/, symbol),
  MARKETS_PERF: '/quotes/index',
} as const;
