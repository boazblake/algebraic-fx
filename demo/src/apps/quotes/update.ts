import { fx } from "algebraic-fx/core/effects";
import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model, Msg, Quote } from "./types";
import { normalize, nextSort } from "./model";

const fetchQuotes = (symbols: readonly string[]): RawEffect<AppEnv, Msg> =>
  fx((env, dispatch) => {
    if (symbols.length === 0) {
      dispatch({ type: "quotes.loaded", quotes: {} });
      return;
    }

    const query = symbols.map(encodeURIComponent).join(",");
    env
      .fetch(`${env.quotesBaseUrl}/quotes?symbols=${query}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json() as Promise<Record<string, Quote>>;
      })
      .then((quotes) => dispatch({ type: "quotes.loaded", quotes }))
      .catch((e) => dispatch({ type: "quotes.failed", error: String(e) }));
  });

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv, Msg>[] } => {
  switch (msg.type) {
    case "quotes.fetch":
      return {
        model: { ...model, loading: true, error: null },
        effects: [fetchQuotes(model.watchlist)],
      };

    case "quotes.loaded":
      return {
        model: { ...model, loading: false, error: null, quotes: msg.quotes },
        effects: [],
      };

    case "quotes.failed":
      return {
        model: { ...model, loading: false, error: msg.error },
        effects: [],
      };

    case "quotes.add": {
      const s = normalize(msg.symbol);
      if (s.length === 0) return { model, effects: [] };
      if (model.watchlist.includes(s)) return { model, effects: [] };
      return {
        model: { ...model, watchlist: [...model.watchlist, s] },
        effects: [],
      };
    }

    case "quotes.remove":
      return {
        model: {
          ...model,
          watchlist: model.watchlist.filter((s) => s !== msg.symbol),
        },
        effects: [],
      };

    case "quotes.togglePolling":
      return { model: { ...model, polling: !model.polling }, effects: [] };

    case "quotes.setFilter":
      return { model: { ...model, filter: msg.filter }, effects: [] };

    case "quotes.setSort": {
      const s = nextSort(model, msg.key);
      return { model: { ...model, ...s }, effects: [] };
    }

    default:
      return { model, effects: [] };
  }
};
