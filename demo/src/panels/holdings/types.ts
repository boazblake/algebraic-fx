// src/panels/holdings/types.ts
import type { Holding, ValidationError } from "@shared/types";

export type HoldingInput = {
  ticker: string;
  shares: string;
};

export type Model = {
  input: HoldingInput;
  holdings: Holding[];
  validationErrors: ValidationError[];

  fetchingPrices: Set<string>;
  priceErrors: Map<string, string>;
  editingShares: Record<string, string>;
};

export type Msg =
  | { type: "SET_TICKER"; value: string }
  | { type: "SET_SHARES"; value: string }
  | { type: "ADD_HOLDING" }
  | { type: "REMOVE_HOLDING"; ticker: string }
  | { type: "FETCH_PRICE"; ticker: string }
  | { type: "PRICE_FETCHED"; ticker: string; price: number }
  | { type: "PRICE_ERROR"; ticker: string; error: string }
  | { type: "REFRESH_ALL_PRICES" }
  | { type: "CLEAR_VALIDATION_ERRORS" }

  // New: task-runtime responses
  | { type: "PRICE_FETCHED_OK"; msg: { ticker: string; price: number } }
  | { type: "PRICE_FETCHED_ERR"; msg: { ticker: string; error: string } }

  // New: inline edit of absolute shares per holding (buy/sell)
  | { type: "SET_EDITING_SHARES"; ticker: string; value: string }
  | { type: "APPLY_EDITING_SHARES"; ticker: string }

  // Coordination up to root model
  | { type: "SET_HOLDINGS"; holdings: Holding[] };
