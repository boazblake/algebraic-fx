import type { RawEffect } from "algebraic-fx/core/effects";
import { fx } from "algebraic-fx";
import type { AppEnv } from "../../env";

export type Quote = {
  id: string;
  usd: number;
};

export type Msg =
  | { type: "quotes.fetch" }
  | { type: "quotes.loaded"; quotes: Record<string, Quote> }
  | { type: "quotes.failed"; error: string };

export type Model = {
  watchlist: string[];
  quotes: Record<string, Quote>;
  loading: boolean;
  error: string | null;
};

const fetchQuotes = (ids: string[]): RawEffect<AppEnv, Msg> =>
  fx(async (env, dispatch) => {
    try {
      const qs = new URLSearchParams({
        ids: ids.join(","),
        vs_currencies: "usd",
      });
      const res = await env.window.fetch(
        `${env.quotesBaseUrl}/simple/price?${qs}`
      );
      if (!res.ok) throw new Error(res.statusText);
      const json = (await res.json()) as Record<string, { usd: number }>;

      const out: Record<string, Quote> = {};
      for (const id of ids) {
        if (json[id]) out[id] = { id, usd: json[id].usd };
      }

      dispatch({ type: "quotes.loaded", quotes: out });
    } catch (e) {
      dispatch({
        type: "quotes.failed",
        error: e instanceof Error ? e.message : String(e),
      });
    }
  });

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "quotes.fetch":
      return {
        model: { ...model, loading: true, error: null },
        effects: [fetchQuotes(model.watchlist)],
      };

    case "quotes.loaded":
      return {
        model: {
          ...model,
          quotes: msg.quotes,
          loading: false,
          error: null,
        },
        effects: [],
      };

    case "quotes.failed":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };
    default:
      return { model, effects: [] };
  }
};
