import { Reader, Task, Either } from "algebraic-fx";

export type HttpEnv = {
  apiKey: string;
  baseUrl: string;
  fetch: typeof fetch;
};

export type ApiError =
  | { type: "network"; message: string }
  | { type: "rateLimit"; retryAfter: number }
  | { type: "invalidTicker"; ticker: string }
  | { type: "parseError"; raw: string }
  | { type: "unknown"; error: unknown };

export type StockQuote = {
  symbol: string;
  price: number;
  timestamp: string;
};

// --------------------- rate limit ---------------------

let apiCallCount = 0;
let lastResetTime = Date.now();

const checkRateLimit = (): Either<ApiError, void> => {
  const now = Date.now();
  const oneMinute = 60 * 1000;

  if (now - lastResetTime > oneMinute) {
    apiCallCount = 0;
    lastResetTime = now;
  }

  if (apiCallCount >= 5) {
    const retryAfter = 60 - Math.floor((now - lastResetTime) / 1000);
    return Either.Left({
      type: "rateLimit",
      retryAfter: retryAfter > 0 ? retryAfter : 1,
    });
  }

  apiCallCount += 1;
  return Either.Right(undefined);
};

// --------------------- main API ---------------------

export const fetchStockPrice = (
  ticker: string
): Reader<HttpEnv, Task<ApiError, StockQuote>> =>
  Reader((env: HttpEnv) =>
    Task<ApiError, StockQuote>(async (signal?: AbortSignal) => {
      const rl = checkRateLimit();
      if (rl._tag === "Left") {
        return rl as Either<ApiError, StockQuote>;
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

        if (data["Error Message"]) {
          return Either.Left<ApiError>({
            type: "invalidTicker",
            ticker,
          });
        }

        if (data["Note"]) {
          return Either.Left<ApiError>({
            type: "rateLimit",
            retryAfter: 60,
          });
        }

        const quote = data["Global Quote"];

        if (!quote || !quote["01. symbol"] || !quote["05. price"]) {
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

export const createHttpEnv = (apiKey: string): HttpEnv => ({
  apiKey,
  baseUrl: "https://www.alphavantage.co",
  fetch: window.fetch.bind(window),
});

export const createMockHttpEnv = (): HttpEnv => ({
  apiKey: "demo",
  baseUrl: "https://www.alphavantage.co",
  fetch: async (
    _input: RequestInfo | URL,
    _init?: RequestInit
  ): Promise<Response> => {
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
