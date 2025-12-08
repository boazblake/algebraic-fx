// src/effects/api.ts
import { Reader } from "algebraic-fx";
import { Task } from "algebraic-fx";
import { Either } from "algebraic-fx";
import type { AppEnv } from "@core/env";

/* ------------------------------------------------------------------------
   Domain Types
------------------------------------------------------------------------ */

export type ApiError =
  | { _tag: "NetworkError"; message: string }
  | { _tag: "AbortError"; message: string }
  | { _tag: "HttpError"; status: number; message: string }
  | { _tag: "DecodeError"; message: string };

export type GlobalQuote = {
  symbol: string;
  price: number;
};

/* ------------------------------------------------------------------------
   URL Builder
------------------------------------------------------------------------ */

const mkQuoteUrl = (env: AppEnv, symbol: string): string => {
  const base = env.baseUrl ?? "https://www.alphavantage.co";

  const params = new URLSearchParams();
  params.set("function", "GLOBAL_QUOTE");
  params.set("symbol", symbol);

  if (env.apiKey) params.set("apikey", env.apiKey);

  return `${base}/query?${params.toString()}`;
};

/* ------------------------------------------------------------------------
   JSON Fetch (Abort-aware, no async/await)
------------------------------------------------------------------------ */

const fetchJson = (url: string): Reader<AppEnv, Task<ApiError, unknown>> =>
  Reader((env: AppEnv) =>
    Task<ApiError, unknown>(() =>
      env
        .fetch(url)
        .then((res) => {
          if (!res.ok) {
            return Either.Left<ApiError>({
              _tag: "HttpError",
              status: res.status,
              message: res.statusText,
            });
          }
          return res
            .json()
            .then((json) => Either.Right<unknown>(json))
            .catch((e) =>
              Either.Left<ApiError>({
                _tag: "DecodeError",
                message: e instanceof Error ? e.message : String(e),
              })
            );
        })
        .catch((e: any) => {
          const msg = e instanceof Error ? e.message : String(e);
          if (e?.name === "AbortError") {
            return Either.Left<ApiError>({
              _tag: "AbortError",
              message: msg,
            });
          }
          return Either.Left<ApiError>({
            _tag: "NetworkError",
            message: msg,
          });
        })
    )
  );

/* ------------------------------------------------------------------------
   Decoding
------------------------------------------------------------------------ */

const decodeGlobalQuote = (raw: unknown): Either<ApiError, GlobalQuote> => {
  if (typeof raw !== "object" || raw === null) {
    return Either.Left<ApiError>({
      _tag: "DecodeError",
      message: "JSON root is not an object",
    });
  }

  const root = raw as Record<string, unknown>;
  const gq = root["Global Quote"];

  if (typeof gq !== "object" || gq === null) {
    return Either.Left<ApiError>({
      _tag: "DecodeError",
      message: "Missing Global Quote field",
    });
  }

  const fields = gq as Record<string, unknown>;
  const symbol = fields["01. symbol"];
  const priceStr = fields["05. price"];

  if (typeof symbol !== "string") {
    return Either.Left<ApiError>({
      _tag: "DecodeError",
      message: "Missing or invalid symbol",
    });
  }

  if (typeof priceStr !== "string") {
    return Either.Left<ApiError>({
      _tag: "DecodeError",
      message: "Missing or invalid price",
    });
  }

  const price = Number(priceStr);
  if (!Number.isFinite(price)) {
    return Either.Left<ApiError>({
      _tag: "DecodeError",
      message: "Price is not numeric",
    });
  }

  return Either.Right<GlobalQuote>({ symbol, price });
};

/* ------------------------------------------------------------------------
   PUBLIC API — Fetch Stock Quote (Abort-aware, no async)
------------------------------------------------------------------------ */

export const fetchStockPrice = (
  symbol: string
): Reader<AppEnv, Task<ApiError, GlobalQuote>> =>
  Reader((env: AppEnv) => {
    const url = mkQuoteUrl(env, symbol);

    const jsonTask = fetchJson(url).run(env); // Task<ApiError, unknown>

    // Chain decoding in the Task context
    return jsonTask.chain((raw) =>
      Task.fromEither<ApiError, GlobalQuote>(decodeGlobalQuote(raw))
    );
  });

/* ------------------------------------------------------------------------
   Error Formatting
------------------------------------------------------------------------ */

export const formatApiError = (e: ApiError): string => {
  switch (e._tag) {
    case "NetworkError":
    case "AbortError":
      return e.message;

    case "HttpError":
      return `HTTP ${e.status}: ${e.message}`;

    case "DecodeError":
      return `Decode error: ${e.message}`;
  }
};
