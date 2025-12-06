import { IO } from "algebraic-fx";
import { Reader } from "algebraic-fx";
import { Maybe } from "algebraic-fx";
import { Either } from "algebraic-fx";
import type { Dispatch, RawEffect } from "algebraic-fx";
import type { AppEnv } from "@core/env";

import type { Model, Msg } from "./types";
import type { Holding, ValidationError } from "@shared/types";
import {
  validateHoldingInput,
  validateNoDuplicate,
} from "../../shared/validation";
import {
  loadHoldings, // kept for completeness if you use it in init
  saveHoldings,
  getCachedPrice,
  cachePrice,
} from "../../effects/storage";
import {
  fetchStockPrice,
  formatApiError,
  type ApiError,
  type GlobalQuote,
} from "../../effects/api";

const MAX_CACHE_AGE_MS = 5 * 60 * 1000;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

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

// Reader<AppEnv, IO<void>> that:
//   - builds the Task via fetchStockPrice
//   - runs it with an AbortController
//   - dispatches PRICE_FETCHED or PRICE_ERROR
const fetchPriceEffect = (
  ticker: string,
  dispatch: Dispatch<Msg>
): Reader<AppEnv, IO<void>> =>
  fetchStockPrice(ticker).map((task) =>
    IO(() => {
      const controller = new AbortController();

      task.runWith(controller.signal).then((either) => {
        if (Either.isRight(either)) {
          const quote: GlobalQuote = either.right;
          dispatchPriceFetched(dispatch, ticker, quote.price).run();
        } else {
          const err: ApiError = either.left;
          dispatchPriceError(dispatch, ticker, formatApiError(err)).run();
        }
      });
    })
  );

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

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
        return {
          model: { ...m, validationErrors: vInput.errors },
          effects: [],
        };
      }

      const { ticker, shares } = vInput.value;

      const vDup = validateNoDuplicate(ticker, m.holdings);
      if (vDup._tag === "Failure") {
        return {
          model: { ...m, validationErrors: vDup.errors },
          effects: [],
        };
      }

      const newHoldings = [...m.holdings]; // temporarily mutate local copy
      let newHolding: Holding;

      const effects: RawEffect<AppEnv>[] = [];

      const getCached = getCachedPrice(ticker, MAX_CACHE_AGE_MS);

      const loadPrice: Reader<AppEnv, IO<void>> = Reader((env) =>
        IO(() => {
          const maybe = getCached.run(env).run();
          const price = Maybe.getOrElse(0, maybe);

          newHolding = {
            ticker,
            shares,
            currentPrice: maybe,
            value: price > 0 ? shares * price : 0,
          };

          // Save holding list after creation
          saveHoldings(newHoldings).run(env).run();

          // Trigger price fetch if needed
          if (Maybe.isNothing(maybe)) {
            fetchPriceEffect(ticker, dispatch).run(env).run();
          }
        })
      );

      // Add an effect to load/create the holding
      effects.push(loadPrice);

      // Update model synchronously
      return {
        model: {
          ...m,
          holdings: [
            ...m.holdings,
            {
              ticker,
              shares,
              currentPrice: Maybe.Nothing,
              value: 0,
            },
          ],
          input: { ticker: "", shares: "" },
          validationErrors: [],
        },
        effects,
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

    case "CLEAR_VALIDATION_ERRORS":
      return {
        model: { ...m, validationErrors: [] },
        effects: [],
      };

    default:
      return { model: m, effects: [] };
  }
};
