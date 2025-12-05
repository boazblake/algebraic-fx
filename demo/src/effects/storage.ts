import { IO, Maybe } from "algebraic-fx";
import type { Holding, TargetAllocation } from "../shared/types";

const STORAGE_KEYS = {
  HOLDINGS: "fp-rebalance:holdings",
  TARGET: "fp-rebalance:target",
  PRICES_CACHE: "fp-rebalance:prices-cache",
} as const;

type PriceCacheEntry = {
  price: number;
  timestamp: number;
};

type PriceCache = Record<string, PriceCacheEntry>;

// --------------------- holdings ---------------------

export const saveHoldings = (holdings: Holding[]): IO<void> =>
  IO(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HOLDINGS, JSON.stringify(holdings));
    } catch (error) {
      console.error("[Storage] Failed to save holdings:", error);
    }
  });

export const loadHoldings = (): IO<Maybe<Holding[]>> =>
  IO(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HOLDINGS);
      if (!data) {
        return Maybe.Nothing as Maybe<Holding[]>;
      }

      const parsed = JSON.parse(data) as Holding[];

      const holdings: Holding[] = parsed.map((h) => ({
        ...h,
        currentPrice: Maybe.Nothing,
      }));

      return Maybe.Just(holdings);
    } catch (error) {
      console.error("[Storage] Failed to load holdings:", error);
      return Maybe.Nothing as Maybe<Holding[]>;
    }
  });

// --------------------- target ---------------------

export const saveTarget = (target: TargetAllocation): IO<void> =>
  IO(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TARGET, JSON.stringify(target));
    } catch (error) {
      console.error("[Storage] Failed to save target:", error);
    }
  });

export const loadTarget = (): IO<Maybe<TargetAllocation>> =>
  IO(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TARGET);
      if (!data) {
        return Maybe.Nothing as Maybe<TargetAllocation>;
      }

      const parsed = JSON.parse(data) as TargetAllocation;
      return Maybe.Just(parsed);
    } catch (error) {
      console.error("[Storage] Failed to load target:", error);
      return Maybe.Nothing as Maybe<TargetAllocation>;
    }
  });

export const clearAll = (): IO<void> =>
  IO(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.HOLDINGS);
      localStorage.removeItem(STORAGE_KEYS.TARGET);
      localStorage.removeItem(STORAGE_KEYS.PRICES_CACHE);
    } catch (error) {
      console.error("[Storage] Failed to clear data:", error);
    }
  });

// --------------------- price cache ---------------------

const loadPriceCache = (): IO<PriceCache> =>
  IO(() => {
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

export const cachePrice = (ticker: string, price: number): IO<void> =>
  IO(() => {
    try {
      const cache = loadPriceCache().run();
      const updated: PriceCache = {
        ...cache,
        [ticker]: { price, timestamp: Date.now() },
      };
      localStorage.setItem(
        STORAGE_KEYS.PRICES_CACHE,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error("[Storage] Failed to cache price:", error);
    }
  });

export const getCachedPrice = (ticker: string): IO<Maybe<number>> =>
  IO(() => {
    try {
      const cache = loadPriceCache().run();
      const entry = cache[ticker];
      if (!entry) {
        return Maybe.Nothing as Maybe<number>;
      }

      const now = Date.now();
      const ttl = 5 * 60 * 1000;

      if (now - entry.timestamp > ttl) {
        return Maybe.Nothing as Maybe<number>;
      }

      return Maybe.Just(entry.price);
    } catch (error) {
      console.error("[Storage] Failed to get cached price:", error);
      return Maybe.Nothing as Maybe<number>;
    }
  });

export const clearExpiredPrices = (): IO<void> =>
  IO(() => {
    try {
      const cache = loadPriceCache().run();
      const now = Date.now();
      const ttl = 5 * 60 * 1000;

      const cleaned: PriceCache = {};
      for (const [ticker, entry] of Object.entries(cache)) {
        const e = entry as PriceCacheEntry;
        if (now - e.timestamp <= ttl) {
          cleaned[ticker] = e;
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
