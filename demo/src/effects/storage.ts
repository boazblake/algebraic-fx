// ============================================================================
// STORAGE EFFECTS - localStorage with IO Monad
// ============================================================================

import { IO, Maybe } from "algebraic-fx";
import type { Holding, TargetAllocation } from "../shared/types";

/**
 * Storage keys
 */
const STORAGE_KEYS = {
  HOLDINGS: "fp-rebalance:holdings",
  TARGET: "fp-rebalance:target",
  PRICES_CACHE: "fp-rebalance:prices-cache",
} as const;

/**
 * Price cache entry (5 minute TTL)
 */
type PriceCacheEntry = {
  price: number;
  timestamp: number;
};

type PriceCache = Record<string, PriceCacheEntry>;

/**
 * Save holdings to localStorage
 * Returns IO<void> - lazy effect that saves when run
 */
export const saveHoldings = (holdings: Holding[]): IO.IO<void> =>
  IO.IO(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HOLDINGS, JSON.stringify(holdings));
    } catch (error) {
      console.error("[Storage] Failed to save holdings:", error);
    }
  });

/**
 * Load holdings from localStorage
 * Returns IO<Maybe<Holding[]>> - Just(holdings) or Nothing if not found/error
 */
export const loadHoldings = (): IO.IO<Maybe.Maybe<Holding[]>> =>
  IO.IO(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HOLDINGS);

      if (!data) {
        return Maybe.Nothing;
      }

      const parsed = JSON.parse(data) as Holding[];

      // Reconstruct Maybe types (they're serialized as plain objects)
      const holdings = parsed.map((h) => ({
        ...h,
        currentPrice:
          h.currentPrice && typeof h.currentPrice === "object" && "_tag" in h.currentPrice
            ? h.currentPrice
            : Maybe.Nothing,
      }));

      return Maybe.Just(holdings);
    } catch (error) {
      console.error("[Storage] Failed to load holdings:", error);
      return Maybe.Nothing;
    }
  });

/**
 * Save target allocation to localStorage
 */
export const saveTarget = (target: TargetAllocation): IO.IO<void> =>
  IO.IO(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TARGET, JSON.stringify(target));
    } catch (error) {
      console.error("[Storage] Failed to save target:", error);
    }
  });

/**
 * Load target allocation from localStorage
 */
export const loadTarget = (): IO.IO<Maybe.Maybe<TargetAllocation>> =>
  IO.IO(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TARGET);

      if (!data) {
        return Maybe.Nothing;
      }

      const parsed = JSON.parse(data) as TargetAllocation;
      return Maybe.Just(parsed);
    } catch (error) {
      console.error("[Storage] Failed to load target:", error);
      return Maybe.Nothing;
    }
  });

/**
 * Clear all stored data
 */
export const clearAll = (): IO.IO<void> =>
  IO.IO(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.HOLDINGS);
      localStorage.removeItem(STORAGE_KEYS.TARGET);
      localStorage.removeItem(STORAGE_KEYS.PRICES_CACHE);
    } catch (error) {
      console.error("[Storage] Failed to clear data:", error);
    }
  });

/**
 * Cache a stock price (5 minute TTL)
 */
export const cachePrice = (ticker: string, price: number): IO.IO<void> =>
  IO.IO(() => {
    try {
      const cache = loadPriceCache().run();
      const newCache: PriceCache = {
        ...cache,
        [ticker]: {
          price,
          timestamp: Date.now(),
        },
      };

      localStorage.setItem(
        STORAGE_KEYS.PRICES_CACHE,
        JSON.stringify(newCache)
      );
    } catch (error) {
      console.error("[Storage] Failed to cache price:", error);
    }
  });

/**
 * Get cached price if not expired (5 minutes)
 */
export const getCachedPrice = (
  ticker: string
): IO.IO<Maybe.Maybe<number>> =>
  IO.IO(() => {
    try {
      const cache = loadPriceCache().run();
      const entry = cache[ticker];

      if (!entry) {
        return Maybe.Nothing;
      }

      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      // Check if cache is still valid
      if (now - entry.timestamp > fiveMinutes) {
        return Maybe.Nothing;
      }

      return Maybe.Just(entry.price);
    } catch (error) {
      console.error("[Storage] Failed to get cached price:", error);
      return Maybe.Nothing;
    }
  });

/**
 * Load price cache from localStorage
 * Private helper
 */
const loadPriceCache = (): IO.IO<PriceCache> =>
  IO.IO(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRICES_CACHE);

      if (!data) {
        return {};
      }

      return JSON.parse(data) as PriceCache;
    } catch (error) {
      console.error("[Storage] Failed to load price cache:", error);
      return {};
    }
  });

/**
 * Clear expired price cache entries
 */
export const clearExpiredPrices = (): IO.IO<void> =>
  IO.IO(() => {
    try {
      const cache = loadPriceCache().run();
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      const cleaned: PriceCache = {};

      for (const [ticker, entry] of Object.entries(cache)) {
        if (now - entry.timestamp <= fiveMinutes) {
          cleaned[ticker] = entry;
        }
      }

      localStorage.setItem(
        STORAGE_KEYS.PRICES_CACHE,
        JSON.stringify(cleaned)
      );
    } catch (error) {
      console.error("[Storage] Failed to clear expired prices:", error);
    }
  });
