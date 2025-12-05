// ============================================================================
// HOLDINGS PANEL - Types
// Complete fractal Program for managing portfolio holdings
// ============================================================================

import type { Holding, ValidationError } from "../../shared/types";

/**
 * Holdings panel state
 */
export type Model = {
  holdings: Holding[];
  input: {
    ticker: string;
    shares: string;
  };
  validationErrors: ValidationError[];
  fetchingPrices: Set<string>; // Tickers currently being fetched
  priceErrors: Map<string, string>; // Ticker -> error message
};

/**
 * Holdings panel messages (discriminated union)
 */
export type Msg =
  | { type: "SET_TICKER"; value: string }
  | { type: "SET_SHARES"; value: string }
  | { type: "ADD_HOLDING" }
  | { type: "REMOVE_HOLDING"; ticker: string }
  | { type: "FETCH_PRICE"; ticker: string }
  | { type: "PRICE_FETCHED"; ticker: string; price: number }
  | { type: "PRICE_ERROR"; ticker: string; error: string }
  | { type: "REFRESH_ALL_PRICES" }
  | { type: "CLEAR_VALIDATION_ERRORS" };
