/**
 * Defines the FMP API routes for technical indicator endpoint
 * on an object, to preserve consistency of the codebase.
 */
export const ROUTES = {
  TECHNICAL_INDICATOR: () => (timeframe: string) => (symbol: string) =>
    '/technical_indicator/:timeframe/:symbol'
      .replace(/:timeframe/, timeframe)
      .replace(/:symbol/, symbol),
} as const;
