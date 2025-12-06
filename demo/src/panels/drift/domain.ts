// src/panels/drift/domain.ts
import type { Holding, TargetAllocation, DriftReport } from "@shared/types";

/**
 * Sum of values.
 */
export const totalValue = (holdings: Holding[]): number =>
  holdings.reduce((sum, h) => sum + h.value, 0);

/**
 * Split holdings by asset class.
 * Note: You may replace classify logic with shared/types version.
 */
const classify = (ticker: string): "stocks" | "bonds" | "cash" => {
  const bonds = ["BND", "AGG", "TLT", "IEF"];
  return bonds.includes(ticker) ? "bonds" : "stocks";
};

/**
 * Pure calculation of current allocation.
 */
export const computeCurrent = (
  holdings: Holding[]
): { stocks: number; bonds: number; cash: number; total: number } => {
  const total = totalValue(holdings);

  if (total === 0) {
    return { stocks: 0, bonds: 0, cash: 0, total: 0 };
  }

  const stocksVal = holdings
    .filter((h) => classify(h.ticker) === "stocks")
    .reduce((n, h) => n + h.value, 0);

  const bondsVal = holdings
    .filter((h) => classify(h.ticker) === "bonds")
    .reduce((n, h) => n + h.value, 0);

  const cashVal = total - stocksVal - bondsVal;

  return {
    stocks: (stocksVal / total) * 100,
    bonds: (bondsVal / total) * 100,
    cash: (cashVal / total) * 100,
    total,
  };
};

/**
 * Pure drift calculation.
 */
export const computeDrift = (
  holdings: Holding[],
  target: TargetAllocation
): DriftReport => {
  const current = computeCurrent(holdings);

  const drift = {
    stocks: current.stocks - target.stocks,
    bonds: current.bonds - target.bonds,
    cash: current.cash - target.cash,
  };

  return {
    current: {
      stocks: current.stocks,
      bonds: current.bonds,
      cash: current.cash,
    },
    target,
    drift,
    totalValue: current.total,
  };
};
