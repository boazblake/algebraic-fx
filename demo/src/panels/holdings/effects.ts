// src/panels/holdings/effects.ts
import type { EffectLike, Payload } from "algebraic-fx";
import type { AppEnv } from "@core/env";
import {
  fetchStockPrice,
  formatApiError,
  type ApiError,
  type GlobalQuote,
} from "@effects/api";
import { taskEffect } from "algebraic-fx"; // or your local task-effect wrapper
import type { TaskId } from "algebraic-fx";

export const fetchPriceTaskEffect = <Env extends AppEnv<P>, P extends Payload>(
  id: TaskId,
  ticker: string
): EffectLike<Env, P> =>
  taskEffect<Env, P, ApiError | unknown, GlobalQuote>(
    id,
    fetchStockPrice(ticker), // Reader<Env, Task<ApiError, GlobalQuote>>
    (_taskId, quote) =>
      ({
        type: "PRICE_FETCHED_OK",
        msg: { ticker, price: quote.price },
      }) as P,
    (_taskId, error) =>
      ({
        type: "PRICE_FETCHED_ERR",
        msg: {
          ticker,
          error: formatApiError(
            (error as ApiError) ?? { kind: "unknown", message: String(error) }
          ),
        },
      }) as P
  );
