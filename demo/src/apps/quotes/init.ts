import { IO } from "algebraic-fx";
import type { IO as IOType } from "algebraic-fx/adt/io";
import type { RawEffect } from "algebraic-fx/core/effects";
import type { AppEnv } from "../../env";
import type { Msg } from "./update";

export type Quote = {
  id: string;
  usd: number;
  lastUpdatedMs: number;
};

export type SortKey = "name" | "usd";
export type SortDir = "asc" | "desc";

export type Model = {
  watchlist: string[];
  quotes: Record<string, Quote | undefined>;
  loading: boolean;
  error: string | null;

  pollOn: boolean;
  pollEveryMs: number;

  filter: string;
  sortKey: SortKey;
  sortDir: SortDir;
};

export const initialWatchlist = ["bitcoin", "ethereum", "solana"] as const;

export const init: IOType<{ model: Model; effects: RawEffect<AppEnv, Msg>[] }> =
  IO.of({
    model: {
      watchlist: [...initialWatchlist],
      quotes: {},
      loading: false,
      error: null,
      pollOn: false,
      pollEveryMs: 4000,
      filter: "",
      sortKey: "usd",
      sortDir: "desc",
    },
    effects: [],
  });
