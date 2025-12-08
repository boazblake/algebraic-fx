// ============================================================================
// SHARED DOMAIN TYPES
// Core business entities used across all panels
// ============================================================================
import type { Maybe } from "algebraic-fx";

/**
 * A single stock/bond holding in the portfolio
 */
export type Holding = {
  ticker: string; // e.g. "AAPL"
  shares: number; // Number of shares owned
  currentPrice: Maybe<number>; // Just(150.25) or Nothing if not fetched
  value: number; // shares * price (0 if price not available)
};

/**
 * Target portfolio allocation (must sum to 100%)
 */
export type TargetAllocation = {
  stocks: number; // 0-100
  bonds: number; // 0-100
  cash: number; // 0-100
};

/**
 * Asset classification for holdings
 */
export type AssetClass = "stocks" | "bonds" | "cash";

/**
 * Drift analysis comparing current vs target allocation
 */
export type DriftReport = {
  current: {
    stocks: number;
    bonds: number;
    cash: number;
  };
  target: {
    stocks: number;
    bonds: number;
    cash: number;
  };
  drift: {
    stocks: number; // Current - Target (negative = underweight)
    bonds: number;
    cash: number;
  };
  totalValue: number;
};

/**
 * A single trade recommendation
 */
export type Trade = {
  action: "buy" | "sell" | "hold";
  ticker: string;
  shares: number;
  price: number;
  total: number; // shares * price
};

/**
 * Complete trade plan with final allocation
 */
export type TradePlan = {
  trades: Trade[];
  finalAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
  };
  cashNeeded: number; // Positive = need to add, negative = will receive
};

/**
 * Audit log entry (from Writer monad)
 */
export type AuditEntry = {
  timestamp: string;
  operation: string;
  details: any;
  success: boolean;
};

/**
 * Validation error wrapper
 */
export type ValidationError = {
  field: string;
  message: string;
};
