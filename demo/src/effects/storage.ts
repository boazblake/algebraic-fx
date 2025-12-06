import { IO } from "algebraic-fx";
import { Reader } from "algebraic-fx";
import { Maybe } from "algebraic-fx";
import type { AppEnv } from "@core/env";
import type { Holding, TargetAllocation } from "@shared/types";

const HOLDINGS_KEY = "holdings";
const TARGET_KEY = "target";
const PRICE_CACHE_KEY = "price-cache";

type PriceCacheEntry = {
  price: number;
  timestamp: number;
};

type PriceCache = Record<string, PriceCacheEntry>;

const safeParseJson = <A>(raw: string): Maybe<A> => {
  try {
    const parsed = JSON.parse(raw) as A;
    return Maybe.of(parsed);
  } catch {
    return Maybe.Nothing as Maybe<A>;
  }
};

const readKey = (key: string): Reader<AppEnv, IO<Maybe<string>>> =>
  Reader((env: AppEnv) =>
    IO(() => {
      const raw = env.localStorage.getItem(key);
      return Maybe.fromNullable(raw);
    })
  );

const writeKey = (key: string, value: string): Reader<AppEnv, IO<void>> =>
  Reader((env: AppEnv) =>
    IO(() => {
      env.localStorage.setItem(key, value);
    })
  );

/* HOLDINGS */

export const loadHoldings: Reader<AppEnv, IO<Maybe<Holding[]>>> = Reader(
  (env: AppEnv) =>
    IO(() => {
      const maybeRaw = readKey(HOLDINGS_KEY).run(env).run();
      return Maybe.chain(
        (raw: string) => safeParseJson<Holding[]>(raw),
        maybeRaw
      );
    })
);

export const saveHoldings = (holdings: Holding[]): Reader<AppEnv, IO<void>> =>
  Reader((env: AppEnv) =>
    IO(() => {
      const json = JSON.stringify(holdings);
      writeKey(HOLDINGS_KEY, json).run(env).run();
    })
  );

/* TARGET */

export const loadTarget: Reader<AppEnv, IO<Maybe<TargetAllocation>>> = Reader(
  (env: AppEnv) =>
    IO(() => {
      const maybeRaw = readKey(TARGET_KEY).run(env).run();
      return Maybe.chain(
        (raw: string) => safeParseJson<TargetAllocation>(raw),
        maybeRaw
      );
    })
);

export const saveTarget = (
  target: TargetAllocation
): Reader<AppEnv, IO<void>> =>
  Reader((env: AppEnv) =>
    IO(() => {
      const json = JSON.stringify(target);
      writeKey(TARGET_KEY, json).run(env).run();
    })
  );

/* PRICE CACHE */

const defaultPriceCache: PriceCache = {};

export const loadPriceCache: Reader<AppEnv, IO<PriceCache>> = Reader(
  (env: AppEnv) =>
    IO(() => {
      const maybeRaw = readKey(PRICE_CACHE_KEY).run(env).run();
      const maybeParsed = Maybe.chain(
        (raw: string) => safeParseJson<PriceCache>(raw),
        maybeRaw
      );
      return Maybe.getOrElse<PriceCache>(defaultPriceCache, maybeParsed);
    })
);

export const savePriceCache = (cache: PriceCache): Reader<AppEnv, IO<void>> =>
  Reader((env: AppEnv) =>
    IO(() => {
      const json = JSON.stringify(cache);
      writeKey(PRICE_CACHE_KEY, json).run(env).run();
    })
  );

export const getCachedPrice = (
  ticker: string,
  maxAgeMs: number
): Reader<AppEnv, IO<Maybe<number>>> =>
  Reader((env: AppEnv) =>
    IO(() => {
      const cache = loadPriceCache.run(env).run();
      const entry = cache[ticker];
      if (!entry) {
        return Maybe.Nothing as Maybe<number>;
      }
      const now = Date.now();
      const age = now - entry.timestamp;
      if (age > maxAgeMs) {
        return Maybe.Nothing as Maybe<number>;
      }
      return Maybe.of(entry.price);
    })
  );

export const cachePrice = (
  ticker: string,
  price: number
): Reader<AppEnv, IO<void>> =>
  Reader((env: AppEnv) =>
    IO(() => {
      const cache = loadPriceCache.run(env).run();
      const next: PriceCache = {
        ...cache,
        [ticker]: { price, timestamp: Date.now() },
      };
      savePriceCache(next).run(env).run();
    })
  );
