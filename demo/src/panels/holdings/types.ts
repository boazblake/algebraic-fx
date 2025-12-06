// src/panels/holdings/types.ts
import type { Holding, ValidationError } from "@shared/types";

export type Model = {
  input: {
    ticker: string;
    shares: string;
  };
  holdings: Holding[];
  fetchingPrices: Set<string>;
  priceErrors: Map<string, string>;
  validationErrors: ValidationError[];
};

export type Msg =
  | { type: "SET_TICKER"; value: string }
  | { type: "SET_SHARES"; value: string }
  | { type: "ADD_HOLDING" }
  | { type: "REMOVE_HOLDING"; ticker: string }
  | { type: "SET_HOLDINGS"; holdings: Holding[] }
  | { type: "FETCH_PRICE"; ticker: string }
  | { type: "PRICE_FETCHED"; ticker: string; price: number }
  | { type: "PRICE_ERROR"; ticker: string; error: string }
  | { type: "REFRESH_ALL_PRICES" }
  | { type: "CLEAR_VALIDATION_ERRORS" };
