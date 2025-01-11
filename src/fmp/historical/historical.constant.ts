/**
 * Defines the FMP API routes for historical data endpoints
 * on an object, to preserve consistency of the codebase.
 */
export const ROUTES = {
  INTRADAY_CHART: () => (timeframe: string) => (symbol: string) =>
    '/historical-chart/:timeframe/:symbol'
      .replace(/:timeframe/, timeframe)
      .replace(/:symbol/, symbol),
  EOD_CHART: (symbol: string) =>
    '/historical-price-full/:symbol'.replace(/:symbol/, symbol),
} as const;
