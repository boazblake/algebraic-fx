export type Quote = {
  symbol: string;
  usd: number;
  ts: number;
};

export type SortKey = "usd" | "symbol" | "ts";
export type SortDir = "asc" | "desc";

export type Msg =
  | { type: "quotes.fetch" }
  | { type: "quotes.loaded"; quotes: Record<string, Quote> }
  | { type: "quotes.failed"; error: string }
  | { type: "quotes.add"; symbol: string }
  | { type: "quotes.remove"; symbol: string }
  | { type: "quotes.togglePolling" }
  | { type: "quotes.setFilter"; filter: string }
  | { type: "quotes.setSort"; key: SortKey };

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
