// ============================================================================
// API EFFECTS - Alpha Vantage Integration with Reader + Task + Either
// ============================================================================

import { Reader, Task, Either, IO } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx";

/**
 * HTTP Environment for Reader pattern
 * Allows dependency injection of API config
 */
export type HttpEnv = {
  apiKey: string;
  baseUrl: string;
  fetch: typeof fetch;
};

/**
 * Typed API errors (discriminated union)
 */
export type ApiError =
  | { type: "network"; message: string }
  | { type: "rateLimit"; retryAfter: number }
  | { type: "invalidTicker"; ticker: string }
  | { type: "parseError"; raw: string }
  | { type: "unknown"; error: unknown };

/**
 * Stock quote response from Alpha Vantage
 */
export type StockQuote = {
  symbol: string;
  price: number;
  timestamp: string;
};

/**
 * Rate limit tracking (in-memory for MVP)
 */
let apiCallCount = 0;
let lastResetTime = Date.now();

const checkRateLimit = (): Either.Either<ApiError, void> => {
  const now = Date.now();
  const oneMinute = 60 * 1000;

  // Reset counter every minute
  if (now - lastResetTime > oneMinute) {
    apiCallCount = 0;
    lastResetTime = now;
  }

  // Alpha Vantage free tier: 5 calls per minute
  if (apiCallCount >= 5) {
    return Either.Left({
      type: "rateLimit",
      retryAfter: 60 - Math.floor((now - lastResetTime) / 1000),
    });
  }

  apiCallCount++;
  return Either.Right(undefined);
};

/**
 * Fetch stock price from Alpha Vantage
 * Returns Reader<HttpEnv, Task<ApiError, StockQuote>>
 *
 * Usage:
 *   const task = fetchStockPrice("AAPL").run(httpEnv);
 *   task.run().then(either => ...)
 */
export const fetchStockPrice = (
  ticker: string
): Reader.Reader<HttpEnv, Task.Task<ApiError, StockQuote>> =>
  Reader.Reader((env: HttpEnv) =>
    Task.Task<ApiError, StockQuote>(async (signal?: AbortSignal) => {
      // Check rate limit before making request
      const rateLimitCheck = checkRateLimit();
      if (Either.isLeft(rateLimitCheck)) {
        return rateLimitCheck as Either.Either<ApiError, StockQuote>;
      }

      try {
        const url = `${env.baseUrl}/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${env.apiKey}`;

        const response = await env.fetch(url, { signal });

        if (!response.ok) {
          if (response.status === 429) {
            return Either.Left<ApiError>({
              type: "rateLimit",
              retryAfter: 60,
            });
          }

          return Either.Left<ApiError>({
            type: "network",
            message: `HTTP ${response.status}: ${response.statusText}`,
          });
        }

        const data = await response.json();

        // Check for API error messages
        if (data["Error Message"]) {
          return Either.Left<ApiError>({
            type: "invalidTicker",
            ticker,
          });
        }

        if (data["Note"]) {
          // Rate limit message from API
          return Either.Left<ApiError>({
            type: "rateLimit",
            retryAfter: 60,
          });
        }

        const quote = data["Global Quote"];

        if (!quote || !quote["01. symbol"]) {
          return Either.Left<ApiError>({
            type: "parseError",
            raw: JSON.stringify(data),
          });
        }

        const stockQuote: StockQuote = {
          symbol: quote["01. symbol"],
          price: parseFloat(quote["05. price"]),
          timestamp: quote["07. latest trading day"],
        };

        return Either.Right<StockQuote>(stockQuote);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return Either.Left<ApiError>({
            type: "network",
            message: "Request cancelled",
          });
        }

        return Either.Left<ApiError>({
          type: "unknown",
          error,
        });
      }
    })
  );

/**
 * Create an IO effect that fetches a price and dispatches the result
 * This bridges Task (async) with the Program's dispatch system
 */
export const fetchPriceEffect = <Msg>(
  ticker: string,
  env: HttpEnv,
  onSuccess: (ticker: string, price: number) => Msg,
  onError: (ticker: string, error: string) => Msg
): IO.IO<void> =>
  IO.IO(() => {
    const task = fetchStockPrice(ticker).run(env);

    task.run().then((either) => {
      if (Either.isRight(either)) {
        const quote = either.right;
        // Note: In real app, dispatch would be passed in
        console.log("Price fetched:", quote);
      } else {
        const error = either.left;
        const errorMessage = formatApiError(error);
        console.error("Price fetch failed:", errorMessage);
      }
    });
  });

/**
 * Format API error for display
 */
export const formatApiError = (error: ApiError): string => {
  switch (error.type) {
    case "network":
      return `Network error: ${error.message}`;
    case "rateLimit":
      return `Rate limit exceeded. Try again in ${error.retryAfter} seconds.`;
    case "invalidTicker":
      return `Invalid ticker: ${error.ticker}`;
    case "parseError":
      return "Failed to parse API response";
    case "unknown":
      return "Unknown error occurred";
  }
};

/**
 * Create HTTP environment for production
 */
export const createHttpEnv = (apiKey: string): HttpEnv => ({
  apiKey,
  baseUrl: "https://www.alphavantage.co",
  fetch: window.fetch.bind(window),
});

/**
 * Create mock HTTP environment for testing
 */
export const createMockHttpEnv = (): HttpEnv => ({
  apiKey: "demo",
  baseUrl: "https://www.alphavantage.co",
  fetch: async (url: string) => {
    // Mock response for testing
    const mockData = {
      "Global Quote": {
        "01. symbol": "AAPL",
        "05. price": "150.25",
        "07. latest trading day": "2024-12-04",
      },
    };

    return {
      ok: true,
      status: 200,
      statusText: "OK",
      json: async () => mockData,
    } as Response;
  },
});
