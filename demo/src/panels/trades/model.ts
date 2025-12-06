import { formatCurrency, formatPercent } from "@shared/calculations";
import type { TradePlan, Trade } from "./types";

export type TradeRowVM = {
  action: string;
  ticker: string;
  shares: string;
  price: string;
  total: string;
};

export type TradesViewModel = {
  hasPlan: boolean;
  hasTrades: boolean;
  summaryText: string;
  trades: TradeRowVM[];
};

/**
 * Build a view model for the trades panel from the domain TradePlan.
 * No DOM, no IO, no env.
 */
export const toViewModel = (plan: TradePlan | null): TradesViewModel => {
  if (!plan) {
    return {
      hasPlan: false,
      hasTrades: false,
      summaryText: "",
      trades: [],
    };
  }

  const { finalAllocation, cashNeeded, trades } = plan;

  const baseSummary =
    `Final allocation: ` +
    `Stocks ${formatPercent(finalAllocation.stocks)}, ` +
    `Bonds ${formatPercent(finalAllocation.bonds)}, ` +
    `Cash ${formatPercent(finalAllocation.cash)}. `;

  const cashSummary =
    cashNeeded > 0
      ? `Add ${formatCurrency(cashNeeded)} of new cash.`
      : cashNeeded < 0
        ? `You will receive ${formatCurrency(Math.abs(cashNeeded))} of cash.`
        : `No net cash movement required.`;

  const rows: TradeRowVM[] = trades.map((t: Trade) => ({
    action: t.action.toUpperCase(),
    ticker: t.ticker,
    shares: t.shares.toString(),
    price: formatCurrency(t.price),
    total: formatCurrency(t.total),
  }));

  return {
    hasPlan: true,
    hasTrades: trades.length > 0,
    summaryText: baseSummary + cashSummary,
    trades: rows,
  };
};
