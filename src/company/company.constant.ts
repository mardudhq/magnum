/**
 * Defines the FMP API routes for company information endpoints
 * on an object, to preserve consistency of the codebase.
 */

export const ROUTES = {
  COMPANY_PROFILE: (symbol: string) =>
    `/profile/:symbol`.replace(/\:symbol/, symbol),
  SCREENER: '/stock-screener',
  EXECUTIVES: (symbol: string) =>
    `/key-execuutives/:symbol`.replace(/\:symbol/, symbol),
  MARKET_CAP: (symbol: string) =>
    `/market-capitalization/:symbol`.replace(/\:symbol/, symbol),
  HIST_MARKET_CAP: (symbol: string) =>
    `/historical-market-capitalization/:symbol`.replace(/\:symbol/, symbol),
  ALL_COUNTRIES: '/get-all-countries',
  ANAL_ESTIMATES: (symbol: string) =>
    `/analyst-estimates/:symbol`.replace(/\:symbol/, symbol),
  ANAL_RECOMMEND: (symbol: string) =>
    `/analyst-stock-recommendations/:symbol`.replace(/\:symbol/, symbol),
  ALL_EXCHANGES_TRADING_HOURS: '/is-the-market-open-all',
  ALL_SECTORS: '/sectors-list',
  ALL_INDUSTRIES: '/industries-list',
  ALL_EXCHANGES: '/exchanges-list',
} as const;
