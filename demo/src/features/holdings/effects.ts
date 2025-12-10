import type { RawEffect, Dispatch, Effect } from "algebraic-fx";
import type { AppEnv } from "../../env";
import type { HoldingsMsg } from "./types";

export const fetchPrice = (id: number, symbol: string): RawEffect<AppEnv> => ({
  run: async (env: AppEnv, dispatch: Dispatch<HoldingsMsg>) => {
    try {
      const url =
        `${env.apiBase}/query?function=GLOBAL_QUOTE` +
        `&symbol=${encodeURIComponent(symbol)}` +
        `&apikey=${env.apiKey}`;

      const res = await env.window.fetch(url);
      const json = await res.json();
      const q = json?.["Global Quote"];
      const price = Number(q?.["05. price"] ?? 100);

      dispatch({ type: "PriceLoaded", id, price });
    } catch (e) {
      dispatch({ type: "PriceFailed", id, error: String(e) });
    }
  },
});
