// src/panels/holdings/update.ts

import { IO, Maybe, Reader, Either } from "algebraic-fx";
import type { Dispatch, RawEffect } from "algebraic-fx";

import type { AppEnv } from "@core/env";
import type { Model, Msg } from "./types";
import type { Holding, ValidationError } from "@shared/types";

import { validateHoldingInput, validateNoDuplicate } from "@shared/validation";

import {
  loadHoldings,
  saveHoldings,
  getCachedPrice,
  cachePrice,
} from "@effects/storage";

import {
  fetchStockPrice,
  formatApiError,
  type ApiError,
  type GlobalQuote,
} from "@effects/api";

const MAX_CACHE_AGE_MS = 5 * 60 * 1000;

/* helpers --------------------------------------------------------------- */

const dispatchPriceFetched = (
  dispatch: Dispatch<Msg>,
  ticker: string,
  price: number
): IO<void> =>
  IO(() => {
    dispatch({ type: "PRICE_FETCHED", ticker, price });
  });

const dispatchPriceError = (
  dispatch: Dispatch<Msg>,
  ticker: string,
  error: string
): IO<void> =>
  IO(() => {
    dispatch({ type: "PRICE_ERROR", ticker, error });
  });

/**
 * Reader<AppEnv, IO<void>> that:
 *  - calls Alpha Vantage for latest price
 *  - dispatches PRICE_FETCHED or PRICE_ERROR
 */
const fetchPriceEffect = (
  ticker: string,
  dispatch: Dispatch<Msg>
): Reader<AppEnv, IO<void>> =>
  fetchStockPrice(ticker).map((task) =>
    IO(() => {
      // No cancellation needed, so run()
      task.run().then((either) => {
        if (Either.isRight(either)) {
          const quote: GlobalQuote = (either as any).right;
          dispatchPriceFetched(dispatch, ticker, quote.price).run();
        } else {
          const err = (either as any).left as ApiError;
          dispatchPriceError(dispatch, ticker, formatApiError(err)).run();
        }
      });
    })
  );

/**
 * Compute value from shares and currentPrice.
 */
const computeValue = (shares: number, currentPrice: Maybe<number>): number =>
  Maybe.fold(
    () => 0,
    (p) => shares * p,
    currentPrice
  );

/**
 * Convenience to update a single holding's shares (pure).
 */
const updateHoldingShares = (
  holdings: Holding[],
  ticker: string,
  newShares: number
): Holding[] => {
  if (newShares <= 0) {
    // Selling everything: remove holding
    return holdings.filter((h) => h.ticker !== ticker);
  }

  return holdings.map((h) =>
    h.ticker === ticker
      ? {
          ...h,
          shares: newShares,
          value: computeValue(newShares, h.currentPrice),
        }
      : h
  );
};

/* update ---------------------------------------------------------------- */

export const update = (
  msg: Msg,
  m: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv>[] } => {
  switch (msg.type) {
    case "SET_TICKER":
      return {
        model: {
          ...m,
          input: { ...m.input, ticker: msg.value.toUpperCase() },
          validationErrors: [],
        },
        effects: [],
      };

    case "SET_SHARES":
      return {
        model: {
          ...m,
          input: { ...m.input, shares: msg.value },
          validationErrors: [],
        },
        effects: [],
      };

    case "ADD_HOLDING": {
      const vInput = validateHoldingInput(m.input.ticker, m.input.shares);

      if (vInput._tag === "Failure") {
        const errors: ValidationError[] = (vInput as any).errors;
        return {
          model: { ...m, validationErrors: errors },
          effects: [],
        };
      }

      const { ticker, shares } = (vInput as any).value;

      const vDup = validateNoDuplicate(ticker, m.holdings);
      if (vDup._tag === "Failure") {
        const errors: ValidationError[] = (vDup as any).errors;
        return {
          model: { ...m, validationErrors: errors },
          effects: [],
        };
      }

      const getCached = getCachedPrice(ticker, MAX_CACHE_AGE_MS);

      const loadAndAdd: Reader<AppEnv, IO<void>> = Reader((env: AppEnv) =>
        IO(() => {
          const maybePrice = getCached.run(env).run();
          const price = Maybe.getOrElse(0, maybePrice);

          const currentPrice = Maybe.isNothing(maybePrice)
            ? Maybe.Nothing
            : Maybe.of(price);

          const newHolding: Holding = {
            ticker,
            shares,
            currentPrice,
            value: price > 0 ? shares * price : 0,
          };

          const newHoldings = [...m.holdings, newHolding];

          // persist to storage
          saveHoldings(newHoldings).run(env).run();

          // fetch fresh price if cache miss
          if (Maybe.isNothing(maybePrice)) {
            fetchPriceEffect(ticker, dispatch).run(env).run();
          }

          // inform parent (main/update.ts) that holdings changed
          dispatch({
            type: "SET_HOLDINGS",
            holdings: newHoldings,
          });
        })
      );

      return {
        model: {
          ...m,
          input: { ticker: "", shares: "" },
          validationErrors: [],
        },
        effects: [loadAndAdd],
      };
    }

    case "REMOVE_HOLDING": {
      const newHoldings = m.holdings.filter((h) => h.ticker !== msg.ticker);
      const saveEffect: Reader<AppEnv, IO<void>> = saveHoldings(newHoldings);

      return {
        model: { ...m, holdings: newHoldings },
        effects: [saveEffect],
      };
    }

    case "FETCH_PRICE": {
      const effect = fetchPriceEffect(msg.ticker, dispatch);

      return {
        model: {
          ...m,
          fetchingPrices: new Set([...m.fetchingPrices, msg.ticker]),
          priceErrors: new Map(
            [...m.priceErrors].filter(([k]) => k !== msg.ticker)
          ),
        },
        effects: [effect],
      };
    }

    case "PRICE_FETCHED": {
      const newHoldings = m.holdings.map((h) =>
        h.ticker === msg.ticker
          ? {
              ...h,
              currentPrice: Maybe.of(msg.price),
              value: h.shares * msg.price,
            }
          : h
      );

      const fetchingPrices = new Set(m.fetchingPrices);
      fetchingPrices.delete(msg.ticker);

      const saveEffect: Reader<AppEnv, IO<void>> = saveHoldings(newHoldings);
      const cacheEffect: Reader<AppEnv, IO<void>> = cachePrice(
        msg.ticker,
        msg.price
      );

      return {
        model: {
          ...m,
          holdings: newHoldings,
          fetchingPrices,
        },
        effects: [saveEffect, cacheEffect],
      };
    }

    case "PRICE_ERROR": {
      const fetchingPrices = new Set(m.fetchingPrices);
      fetchingPrices.delete(msg.ticker);

      const priceErrors = new Map(m.priceErrors);
      priceErrors.set(msg.ticker, msg.error);

      return {
        model: {
          ...m,
          fetchingPrices,
          priceErrors,
        },
        effects: [],
      };
    }

    case "REFRESH_ALL_PRICES": {
      const effects: RawEffect<AppEnv>[] = m.holdings.map((h) =>
        fetchPriceEffect(h.ticker, dispatch)
      );

      return {
        model: {
          ...m,
          fetchingPrices: new Set(m.holdings.map((h) => h.ticker)),
          priceErrors: new Map(),
        },
        effects,
      };
    }

    /* NEW: inline buy/sell via absolute share edit --------------------- */

    case "SET_EDITING_SHARES": {
      const nextEditing = {
        ...m.editingShares,
        [msg.ticker]: msg.value,
      };

      return {
        model: {
          ...m,
          editingShares: nextEditing,
          validationErrors: [],
        },
        effects: [],
      };
    }

    case "APPLY_EDITING_SHARES": {
      const raw = m.editingShares[msg.ticker];

      // Nothing entered -> no-op
      if (raw == null || raw.trim() === "") {
        return { model: m, effects: [] };
      }

      // Reuse existing validation for share count
      const vInput = validateHoldingInput(msg.ticker, raw);

      if (vInput._tag === "Failure") {
        const errors: ValidationError[] = (vInput as any).errors;
        return {
          model: { ...m, validationErrors: errors },
          effects: [],
        };
      }

      const { shares: newShares } = (vInput as any).value;

      const existing = m.holdings.find((h) => h.ticker === msg.ticker);
      if (!existing) {
        // No such holding; ignore
        return { model: m, effects: [] };
      }

      // If shares unchanged, just clear the edit buffer
      if (existing.shares === newShares) {
        const { [msg.ticker]: _removed, ...rest } = m.editingShares;

        return {
          model: {
            ...m,
            editingShares: rest,
            validationErrors: [],
          },
          effects: [],
        };
      }

      const newHoldings = updateHoldingShares(
        m.holdings,
        msg.ticker,
        newShares
      );

      const saveEffect: Reader<AppEnv, IO<void>> = saveHoldings(newHoldings);
      const priceEffect: Reader<AppEnv, IO<void>> = fetchPriceEffect(
        msg.ticker,
        dispatch
      );

      const fetchingPrices = new Set(m.fetchingPrices);
      fetchingPrices.add(msg.ticker);

      const priceErrors = new Map(
        [...m.priceErrors].filter(([k]) => k !== msg.ticker)
      );

      const { [msg.ticker]: _removed, ...restEditing } = m.editingShares;

      // Tell parent that holdings changed (drift/trades, audit, etc.)
      const coord: IO<void> = IO(() => {
        dispatch({
          type: "SET_HOLDINGS",
          holdings: newHoldings,
        });
      });

      return {
        model: {
          ...m,
          holdings: newHoldings,
          editingShares: restEditing,
          validationErrors: [],
          fetchingPrices,
          priceErrors,
        },
        effects: [saveEffect, priceEffect, coord],
      };
    }

    /* housekeeping ----------------------------------------------------- */

    case "CLEAR_VALIDATION_ERRORS":
      return {
        model: { ...m, validationErrors: [] },
        effects: [],
      };

    default:
      return { model: m, effects: [] };
  }
};
