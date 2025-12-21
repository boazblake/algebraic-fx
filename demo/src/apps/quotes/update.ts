import type { Dispatch } from "algebraic-fx/core/types";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Model } from "./init";
import { fetchQuotesEffect, pollingSub } from "./subs";
import type { Quote, SortKey } from "./types";

export type Msg =
  | { type: "quotes.fetch" }
  | { type: "quotes.loaded"; quotes: Record<string, Quote> }
  | { type: "quotes.failed"; error: string }
  | { type: "quotes.togglePolling" }
  | { type: "quotes.setFilter"; value: string }
  | { type: "quotes.setSort"; key: SortKey }
  | { type: "quotes.toggleDir" }
  | { type: "quotes.add"; id: string }
  | { type: "quotes.remove"; id: string };

export const update = (
  msg: Msg,
  model: Model,
  dispatch: Dispatch<Msg>
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
      return model.polling
        ? { model: { ...model, polling: false }, effects: [] }
        : {
            model: { ...model, polling: true },
            effects: [pollingSub(model.pollEveryMs)],
          };

    case "quotes.setFilter":
      return { model: { ...model, filter: msg.value }, effects: [] };

    case "quotes.setSort":
      return { model: { ...model, sortKey: msg.key }, effects: [] };

    case "quotes.toggleDir":
      return {
        model: {
          ...model,
          sortDir: model.sortDir === "asc" ? "desc" : "asc",
        },
        effects: [],
      };

    case "quotes.add":
      if (model.watchlist.includes(msg.id)) return { model, effects: [] };
      return {
        model: {
          ...model,
          watchlist: [msg.id, ...model.watchlist],
        },
        effects: [],
      };

    case "quotes.remove": {
      const next = { ...model.quotes };
      delete next[msg.id];
      return {
        model: {
          ...model,
          watchlist: model.watchlist.filter((x) => x !== msg.id),
          quotes: next,
        },
        effects: [],
      };
    }
  }
};
