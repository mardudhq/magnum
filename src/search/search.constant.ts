/**
 * Defines the FMP API routes for search-related endpoints
 * on an object, to preserve consistency of the codebase.
 */

export const ROUTES = {
  GENERAL_SEARCH: '/search',
  TICKER_SEARCH: '/search-ticker',
  NAME_SEARCH: '/search-name',
} as const;

export type ROUTES_KEYS = typeof ROUTES;
export type ROUTES_VALUES = ROUTES_KEYS[keyof ROUTES_KEYS];
