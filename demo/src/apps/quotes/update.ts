import { fx } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Quote, SortKey } from "./init";

export type Msg =
  | { type: "SetFilter"; value: string }
  | { type: "SetSort"; key: SortKey }
  | { type: "ToggleSortDir" }
  | { type: "AddSymbol"; id: string }
  | { type: "RemoveSymbol"; id: string }
  | { type: "Fetch" }
  | { type: "Fetched"; quotes: Record<string, Quote> }
  | { type: "Failed"; error: string }
  | { type: "TogglePolling" };

const fetchQuotesForIdsEffect = (ids: string[]): RawEffect<AppEnv, Msg> =>
  fx<AppEnv, Msg>((env, dispatch) => {
    void (async () => {
      try {
        if (ids.length === 0) {
          dispatch({ type: "Fetched", quotes: {} });
          return;
        }

        const qs = new URLSearchParams({
          ids: ids.join(","),
          vs_currencies: "usd",
        });

        const url = `${env.quotesBaseUrl}/simple/price?${qs.toString()}`;
        const res = await env.window.fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

        const json = (await res.json()) as Record<string, { usd: number }>;
        const now = env.now();

        const out: Record<string, Quote> = {};
        for (const id of ids) {
          const row = json[id];
          if (!row || typeof row.usd !== "number") continue;
          out[id] = { id, usd: row.usd, lastUpdatedMs: now };
        }

        dispatch({ type: "Fetched", quotes: out });
      } catch (e) {
        dispatch({
          type: "Failed",
          error: e instanceof Error ? e.message : String(e),
        });
      }
    })();
  });

const pollingEffect = (everyMs: number): RawEffect<AppEnv, Msg> =>
  fx<AppEnv, Msg>((env, dispatch) => {
    const id = env.window.setInterval(
      () => dispatch({ type: "Fetch" }),
      everyMs
    );
    return () => env.window.clearInterval(id);
  });

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "SetFilter":
      return { model: { ...model, filter: msg.value }, effects: [] };

    case "SetSort":
      return { model: { ...model, sortKey: msg.key }, effects: [] };

    case "ToggleSortDir":
      return {
        model: { ...model, sortDir: model.sortDir === "asc" ? "desc" : "asc" },
        effects: [],
      };

    case "AddSymbol": {
      const id = msg.id.trim().toLowerCase();
      if (!id) return { model, effects: [] };
      if (model.watchlist.includes(id)) return { model, effects: [] };
      return {
        model: { ...model, watchlist: [id, ...model.watchlist] },
        effects: [],
      };
    }

    case "RemoveSymbol": {
      const watchlist = model.watchlist.filter((x) => x !== msg.id);
      const quotes = { ...model.quotes };
      delete quotes[msg.id];
      return { model: { ...model, watchlist, quotes }, effects: [] };
    }

    case "Fetch":
      return {
        model: { ...model, loading: true, error: null },
        effects: [fetchQuotesForIdsEffect(model.watchlist)],
      };

    case "Fetched":
      return {
        model: {
          ...model,
          loading: false,
          error: null,
          quotes: { ...model.quotes, ...msg.quotes },
        },
        effects: [],
      };

    case "Failed":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };

    case "TogglePolling":
      if (model.pollOn)
        return { model: { ...model, pollOn: false }, effects: [] };
      return {
        model: { ...model, pollOn: true },
        effects: [pollingEffect(model.pollEveryMs)],
      };
    default:
      return { model, effects: [] };
  }
};
