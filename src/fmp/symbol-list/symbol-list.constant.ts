/**
 * Defines the FMP API routes for available securities endpoints
 * on an object, to preserve consistency of the codebase.
 */

export const ROUTES = {
  ALL_STOCK_LIST: '/stock/list',
  ALL_ETF_LIST: '/etf/list',
  STATEMENT_LIST: '/financial-statement-symbol-lists',
  TRADABLE_LIST: '/available-traded/list',
  EXCHANGE_LIST: (exchange: string) =>
    `/symbol/:exchange`.replace(/\:exchange/, exchange),
  INDEX_LIST: '/symbol/available-indexes',
} as const;
