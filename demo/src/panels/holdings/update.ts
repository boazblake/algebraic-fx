import { IO, Maybe } from "algebraic-fx";
import type { Model, Msg } from "./types";
import type { Dispatch, RawEffect } from "algebraic-fx";
import {
  validateHoldingInput,
  validateNoDuplicate,
} from "../../shared/validation";
import { Validation } from "algebraic-fx";
import { saveHoldings, cachePrice, getCachedPrice } from "../../effects/storage";
import { fetchStockPrice, createHttpEnv, formatApiError } from "../../effects/api";
import type { Holding } from "../../shared/types";

export const update = (
  msg: Msg,
  m: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<any>[] } => {
  switch (msg.type) {
    case "SET_TICKER": {
      return {
        model: {
          ...m,
          input: { ...m.input, ticker: msg.value.toUpperCase() },
          validationErrors: [],
        },
        effects: [],
      };
    }

    case "SET_SHARES": {
      return {
        model: {
          ...m,
          input: { ...m.input, shares: msg.value },
          validationErrors: [],
        },
        effects: [],
      };
    }

    case "ADD_HOLDING": {
      // Validate input using Validation monad
      const inputValidation = validateHoldingInput(
        m.input.ticker,
        m.input.shares
      );

      if (Validation.isFailure(inputValidation)) {
        return {
          model: { ...m, validationErrors: inputValidation.errors },
          effects: [],
        };
      }

      const { ticker, shares } = inputValidation.value;

      // Check for duplicates
      const dupValidation = validateNoDuplicate(ticker, m.holdings);

      if (Validation.isFailure(dupValidation)) {
        return {
          model: { ...m, validationErrors: dupValidation.errors },
          effects: [],
        };
      }

      // Check cache first
      const cachedPriceIO = getCachedPrice(ticker);
      const cachedPrice = cachedPriceIO.run();

      const newHolding: Holding = {
        ticker,
        shares,
        currentPrice: cachedPrice,
        value: Maybe.isJust(cachedPrice) ? shares * cachedPrice.value : 0,
      };

      const newHoldings = [...m.holdings, newHolding];

      // Create effects
      const saveEffect = saveHoldings(newHoldings);

      // Fetch price if not in cache
      const fetchEffect =
        Maybe.isNothing(cachedPrice)
          ? createFetchPriceEffect(ticker, dispatch)
          : null;

      const effects = [saveEffect, fetchEffect].filter(
        (e) => e !== null
      ) as RawEffect<any>[];

      return {
        model: {
          ...m,
          holdings: newHoldings,
          input: { ticker: "", shares: "" },
          validationErrors: [],
          fetchingPrices: fetchEffect
            ? new Set([...m.fetchingPrices, ticker])
            : m.fetchingPrices,
        },
        effects,
      };
    }

    case "REMOVE_HOLDING": {
      const newHoldings = m.holdings.filter((h) => h.ticker !== msg.ticker);
      const saveEffect = saveHoldings(newHoldings);

      return {
        model: { ...m, holdings: newHoldings },
        effects: [saveEffect],
      };
    }

    case "FETCH_PRICE": {
      const fetchEffect = createFetchPriceEffect(msg.ticker, dispatch);

      return {
        model: {
          ...m,
          fetchingPrices: new Set([...m.fetchingPrices, msg.ticker]),
          priceErrors: new Map(
            [...m.priceErrors].filter(([k]) => k !== msg.ticker)
          ),
        },
        effects: [fetchEffect],
      };
    }

    case "PRICE_FETCHED": {
      const newHoldings = m.holdings.map((h) =>
        h.ticker === msg.ticker
          ? {
              ...h,
              currentPrice: Maybe.Just(msg.price),
              value: h.shares * msg.price,
            }
          : h
      );

      const fetchingPrices = new Set(m.fetchingPrices);
      fetchingPrices.delete(msg.ticker);

      const saveEffect = saveHoldings(newHoldings);
      const cacheEffect = cachePrice(msg.ticker, msg.price);

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
      const effects = m.holdings.map((h) =>
        createFetchPriceEffect(h.ticker, dispatch)
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

    case "CLEAR_VALIDATION_ERRORS": {
      return {
        model: { ...m, validationErrors: [] },
        effects: [],
      };
    }

    default:
      return { model: m, effects: [] };
  }
};

// Helper: Create fetch price effect
const createFetchPriceEffect = (
  ticker: string,
  dispatch: Dispatch<Msg>
): IO<void> => {
  const env = createHttpEnv("YOUR_API_KEY_HERE"); // TODO: Get from config

  return IO(() => {
    const task = fetchStockPrice(ticker).run(env);

    task.run().then((either) => {
      if (either._tag === "Right") {
        dispatch({
          type: "PRICE_FETCHED",
          ticker,
          price: either.right.price,
        });
      } else {
        dispatch({
          type: "PRICE_ERROR",
          ticker,
          error: formatApiError(either.left),
        });
      }
    });
  });
};
