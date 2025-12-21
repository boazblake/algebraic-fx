import { IO } from "algebraic-fx";
import type { RawEffect } from "algebraic-fx/core/effects";
import { fetchQuotesEffect } from "./subs";
import type { AppEnv } from "../../env";
import type { Quote, SortKey, SortDir } from "./types";

export type Model = {
  watchlist: string[];
  quotes: Record<string, Quote>;
  loading: boolean;
  error: string | null;

  filter: string;
  sortKey: SortKey;
  sortDir: SortDir;

  polling: boolean;
  pollEveryMs: number;
};

export const init = IO.of({
  model: {
    watchlist: ["bitcoin", "ethereum", "solana"],
    quotes: {},
    loading: false,
    error: null,

    filter: "",
    sortKey: "usd",
    sortDir: "desc",

    polling: false,
    pollEveryMs: 4000,
  } satisfies Model,

  effects: [] as RawEffect<AppEnv, any>[],
});
