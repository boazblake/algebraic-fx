import { IO, Maybe, Validation, Either } from "algebraic-fx";
import type { Dispatch, RawEffect } from "algebraic-fx";
import type { Model, Msg } from "./types";
import type { Holding, ValidationError } from "../../shared/types";
import {
  validateHoldingInput,
  validateNoDuplicate,
} from "../../shared/validation";
import {
  saveHoldings,
  cachePrice,
  getCachedPrice,
} from "../../effects/storage";
import {
  createHttpEnv,
  fetchStockPrice,
  formatApiError,
  type HttpEnv,
  type ApiError,
  type StockQuote,
} from "../../effects/api";

export const update = (
  msg: Msg,
  m: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<any>[] } => {
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
      const vInput = validateHoldingInput(
        m.input.ticker,
        m.input.shares
      );

      if (vInput._tag === "Failure") {
        const errors: ValidationError[] = vInput.errors;
        return {
          model: { ...m, validationErrors: errors },
          effects: [],
        };
      }

      const { ticker, shares } = vInput.value;

      const vDup = validateNoDuplicate(ticker, m.holdings);
      if (vDup._tag === "Failure") {
        const errors: ValidationError[] = vDup.errors;
        return {
          model: { ...m, validationErrors: errors },
          effects: [],
        };
      }

      const cachedPrice = getCachedPrice(ticker).run();
      const priceValue = Maybe.getOrElse(0, cachedPrice);

      const newHolding: Holding = {
        ticker,
        shares,
        currentPrice: cachedPrice,
        value: priceValue > 0 ? shares * priceValue : 0,
      };

      const newHoldings = [...m.holdings, newHolding];
      const saveEffect = saveHoldings(newHoldings);

      const effects: RawEffect<any>[] = [saveEffect];

      if (Maybe.isNothing(cachedPrice)) {
        const env = createHttpEnv("YOUR_API_KEY_HERE");
        effects.push(createFetchPriceEffect(ticker, env, dispatch));
      }

      return {
        model: {
          ...m,
          holdings: newHoldings,
          input: { ticker: "", shares: "" },
          validationErrors: [],
          fetchingPrices: Maybe.isNothing(cachedPrice)
            ? new Set([...m.fetchingPrices, ticker])
            : m.fetchingPrices,
        },
        effects,
      };
    }

    case "REMOVE_HOLDING": {
      const newHoldings = m.holdings.filter(
        (h) => h.ticker !== msg.ticker
      );
      const saveEffect = saveHoldings(newHoldings);
      return {
        model: { ...m, holdings: newHoldings },
        effects: [saveEffect],
      };
    }

    case "FETCH_PRICE": {
      const env = createHttpEnv("YOUR_API_KEY_HERE");
      const fetchEffect = createFetchPriceEffect(
        msg.ticker,
        env,
        dispatch
      );

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
      const env = createHttpEnv("YOUR_API_KEY_HERE");
      const effects: RawEffect<any>[] = m.holdings.map((h) =>
        createFetchPriceEffect(h.ticker, env, dispatch)
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


const createFetchPriceEffect = (
  ticker: string,
  env: HttpEnv,
  dispatch: Dispatch<Msg>
): IO<void> =>
  IO(() => {
    const task = fetchStockPrice(ticker).run(env);
    task.run().then((either: Either<ApiError, StockQuote>) => {
      if (either._tag === "Right") {
        const quote = either.right;
        dispatch({
          type: "PRICE_FETCHED",
          ticker,
          price: quote.price,
        });
      } else {
        const e = either.left;
        dispatch({
          type: "PRICE_ERROR",
          ticker,
          error: formatApiError(e),
        });
      }
    });

  });
