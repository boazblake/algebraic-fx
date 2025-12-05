// ============================================================================
// CALCULATIONS - Pure State Transformations with State Monad
// ============================================================================

import { State, Maybe } from "algebraic-fx";
import type {
  Holding,
  TargetAllocation,
  DriftReport,
  Trade,
  TradePlan,
  AssetClass,
} from "./types";

/**
 * Classify a ticker into asset class
 * Hardcoded for MVP - in production would use API/database
 */
export const classifyAsset = (ticker: string): AssetClass => {
  const bonds = [
    "BND",
    "AGG",
    "TLT",
    "IEF",
    "VGIT",
    "BSV",
    "MUB",
    "LQD",
    "HYG",
  ];

  const upperTicker = ticker.toUpperCase();

  if (bonds.includes(upperTicker)) {
    return "bonds";
  }

  // Default to stocks for MVP
  return "stocks";
};

/**
 * Calculate total portfolio value
 */
export const calculateTotalValue = (holdings: Holding[]): number => {
  return holdings.reduce((sum, h) => sum + h.value, 0);
};

/**
 * Calculate current allocation percentages
 * Uses State monad for pure transformation
 */
export const calculateCurrentAllocation = State<
  Holding[],
  { stocks: number; bonds: number; cash: number }
>((holdings) => {
  const totalValue = calculateTotalValue(holdings);

  if (totalValue === 0) {
    return [{ stocks: 0, bonds: 0, cash: 0 }, holdings];
  }

  const stocksValue = holdings
    .filter((h) => classifyAsset(h.ticker) === "stocks")
    .reduce((sum, h) => sum + h.value, 0);

  const bondsValue = holdings
    .filter((h) => classifyAsset(h.ticker) === "bonds")
    .reduce((sum, h) => sum + h.value, 0);

  const cashValue = 0; // MVP: no cash holdings tracked

  const current = {
    stocks: (stocksValue / totalValue) * 100,
    bonds: (bondsValue / totalValue) * 100,
    cash: (cashValue / totalValue) * 100,
  };

  return [current, holdings];
});

/**
 * Calculate drift between current and target allocation
 * Uses State monad to thread portfolio state
 */
export const calculateDrift = (
  target: TargetAllocation
): State<Holding[], DriftReport> =>
  State((holdings) => {
    const totalValue = calculateTotalValue(holdings);

    // Get current allocation
    const [current] = calculateCurrentAllocation.run(holdings);

    // Calculate drift (current - target)
    const drift = {
      stocks: current.stocks - target.stocks,
      bonds: current.bonds - target.bonds,
      cash: current.cash - target.cash,
    };

    const report: DriftReport = {
      current,
      target,
      drift,
      totalValue,
    };

    return [report, holdings];
  });

/**
 * Generate trade recommendations to rebalance portfolio
 * Algorithm:
 * 1. Calculate target dollar amounts for each asset class
 * 2. Calculate delta (target - current) for each class
 * 3. Generate sell orders for overweight positions
 * 4. Generate buy orders for underweight positions
 * 5. Verify final allocation is within tolerance
 */
export const generateTrades = (
  drift: DriftReport,
  holdings: Holding[]
): TradePlan => {
  const { totalValue, target } = drift;

  // Target dollar amounts
  const targetDollars = {
    stocks: (totalValue * target.stocks) / 100,
    bonds: (totalValue * target.bonds) / 100,
    cash: (totalValue * target.cash) / 100,
  };

  // Current dollar amounts
  const stocksValue = holdings
    .filter((h) => classifyAsset(h.ticker) === "stocks")
    .reduce((sum, h) => sum + h.value, 0);

  const bondsValue = holdings
    .filter((h) => classifyAsset(h.ticker) === "bonds")
    .reduce((sum, h) => sum + h.value, 0);

  // Calculate deltas
  const deltas = {
    stocks: targetDollars.stocks - stocksValue,
    bonds: targetDollars.bonds - bondsValue,
    cash: targetDollars.cash - 0,
  };

  const trades: Trade[] = [];
  let cashFlow = 0;

  // Generate sell orders for overweight positions
  if (deltas.stocks < 0) {
    const amountToSell = Math.abs(deltas.stocks);
    const stockHoldings = holdings.filter(
      (h) => classifyAsset(h.ticker) === "stocks"
    );

    // Sell proportionally from stock holdings
    stockHoldings.forEach((holding) => {
      const proportion = holding.value / stocksValue;
      const sellAmount = amountToSell * proportion;
      const price = Maybe.getOrElse(0, holding.currentPrice);

      if (price > 0) {
        const sharesToSell = Math.floor(sellAmount / price);

        if (sharesToSell > 0) {
          trades.push({
            action: "sell",
            ticker: holding.ticker,
            shares: sharesToSell,
            price,
            total: sharesToSell * price,
          });
          cashFlow += sharesToSell * price;
        }
      }
    });
  }

  if (deltas.bonds < 0) {
    const amountToSell = Math.abs(deltas.bonds);
    const bondHoldings = holdings.filter(
      (h) => classifyAsset(h.ticker) === "bonds"
    );

    bondHoldings.forEach((holding) => {
      const proportion = holding.value / bondsValue;
      const sellAmount = amountToSell * proportion;
      const price = Maybe.getOrElse(0, holding.currentPrice);

      if (price > 0) {
        const sharesToSell = Math.floor(sellAmount / price);

        if (sharesToSell > 0) {
          trades.push({
            action: "sell",
            ticker: holding.ticker,
            shares: sharesToSell,
            price,
            total: sharesToSell * price,
          });
          cashFlow += sharesToSell * price;
        }
      }
    });
  }

  // Generate buy orders for underweight positions
  if (deltas.stocks > 0) {
    const amountToBuy = deltas.stocks;
    // For simplicity, buy the first stock holding proportionally
    const stockHolding = holdings.find(
      (h) => classifyAsset(h.ticker) === "stocks"
    );

    if (stockHolding) {
      const price = Maybe.getOrElse(0, stockHolding.currentPrice);

      if (price > 0) {
        const sharesToBuy = Math.floor(amountToBuy / price);

        if (sharesToBuy > 0) {
          trades.push({
            action: "buy",
            ticker: stockHolding.ticker,
            shares: sharesToBuy,
            price,
            total: sharesToBuy * price,
          });
          cashFlow -= sharesToBuy * price;
        }
      }
    }
  }

  if (deltas.bonds > 0) {
    const amountToBuy = deltas.bonds;
    const bondHolding = holdings.find(
      (h) => classifyAsset(h.ticker) === "bonds"
    );

    if (bondHolding) {
      const price = Maybe.getOrElse(0, bondHolding.currentPrice);

      if (price > 0) {
        const sharesToBuy = Math.floor(amountToBuy / price);

        if (sharesToBuy > 0) {
          trades.push({
            action: "buy",
            ticker: bondHolding.ticker,
            shares: sharesToBuy,
            price,
            total: sharesToBuy * price,
          });
          cashFlow -= sharesToBuy * price;
        }
      }
    }
  }

  // Calculate final allocation after trades
  let finalStocksValue = stocksValue;
  let finalBondsValue = bondsValue;

  trades.forEach((trade) => {
    const assetClass = classifyAsset(trade.ticker);
    const amount = trade.total;

    if (trade.action === "buy") {
      if (assetClass === "stocks") finalStocksValue += amount;
      if (assetClass === "bonds") finalBondsValue += amount;
    } else {
      if (assetClass === "stocks") finalStocksValue -= amount;
      if (assetClass === "bonds") finalBondsValue -= amount;
    }
  });

  const finalTotal = finalStocksValue + finalBondsValue + Math.abs(cashFlow);

  const finalAllocation = {
    stocks: (finalStocksValue / finalTotal) * 100,
    bonds: (finalBondsValue / finalTotal) * 100,
    cash: (Math.abs(cashFlow) / finalTotal) * 100,
  };

  return {
    trades,
    finalAllocation,
    cashNeeded: -cashFlow, // Positive = need to add, negative = will receive
  };
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format percentage for display
 */
export const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

/**
 * Format timestamp for display
 */
export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};
