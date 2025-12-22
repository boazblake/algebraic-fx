import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import { fx } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";

/* ============================================================================
 * Types
 * ========================================================================== */

export type Quote = {
  id: string;
  usd: number;
  updatedMs: number;
};

export type Model = {
  watchlist: string[];
  quotes: Record<string, Quote>;
  loading: boolean;
  error: string | null;
  polling: boolean;
  pollEveryMs: number;
};

export type Msg =
  | { type: "quotes.fetch" }
  | { type: "quotes.loaded"; quotes: Record<string, Quote> }
  | { type: "quotes.failed"; error: string }
  | { type: "quotes.togglePolling" }
  | { type: "quotes.add"; id: string }
  | { type: "quotes.remove"; id: string };

/* ============================================================================
 * Effects
 * ========================================================================== */

const fetchQuotesEffect = (ids: string[]): RawEffect<AppEnv, Msg> =>
  fx<AppEnv, Msg>((env, dispatch) => {
    if (ids.length === 0) {
      dispatch({ type: "quotes.loaded", quotes: {} });
      return;
    }

    const qs = new URLSearchParams({
      ids: ids.join(","),
      vs_currencies: "usd",
    });

    const url = `${env.quotesBaseUrl}/simple/price?${qs.toString()}`;

    env.window
      .fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((json: Record<string, { usd: number }>) => {
        const now = env.now();
        const out: Record<string, Quote> = {};

        for (const id of ids) {
          const row = json[id];
          if (!row || typeof row.usd !== "number") continue;
          out[id] = { id, usd: row.usd, updatedMs: now };
        }

        dispatch({ type: "quotes.loaded", quotes: out });
      })
      .catch((e) => {
        dispatch({
          type: "quotes.failed",
          error: e instanceof Error ? e.message : String(e),
        });
      });
  });

/* ============================================================================
 * Update
 * ========================================================================== */

export const update = (
  msg: Msg,
  model: Model
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "quotes.fetch":
      return {
        model: { ...model, loading: true, error: null },
        effects: [fetchQuotesEffect(model.watchlist)],
      };

    case "quotes.loaded":
      return {
        model: {
          ...model,
          loading: false,
          error: null,
          quotes: { ...model.quotes, ...msg.quotes },
        },
        effects: [],
      };

    case "quotes.failed":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };

    case "quotes.togglePolling":
      return {
        model: { ...model, polling: !model.polling },
        effects: [],
      };

    case "quotes.add": {
      const id = msg.id.trim().toLowerCase();
      if (!id || model.watchlist.includes(id)) return { model, effects: [] };

      return {
        model: { ...model, watchlist: [id, ...model.watchlist] },
        effects: [],
      };
    }

    case "quotes.remove": {
      const watchlist = model.watchlist.filter((x) => x !== msg.id);
      const quotes = { ...model.quotes };
      delete quotes[msg.id];

      return {
        model: { ...model, watchlist, quotes },
        effects: [],
      };
    }

    default:
      return { model, effects: [] };
  }
};
