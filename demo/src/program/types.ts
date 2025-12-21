export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Quote = {
  id: string;
  usd: number;
  lastUpdatedMs: number;
};

export type SortKey = "name" | "usd";
export type SortDir = "asc" | "desc";

export type Model = {
  count: number;

  users: User[];
  usersLoading: boolean;
  usersError: string | null;

  watchlist: string[];
  quotes: Record<string, Quote | undefined>;
  quotesLoading: boolean;
  quotesError: string | null;
  pollOn: boolean;
  pollEveryMs: number;

  filter: string;
  sortKey: SortKey;
  sortDir: SortDir;

  clockMs: number;
};

export type Msg =
  | { type: "Increment" }
  | { type: "Decrement" }
  | { type: "Tick"; ms: number }
  | { type: "FetchUsers" }
  | { type: "UsersFetched"; users: User[] }
  | { type: "UsersFailed"; error: string }
  | { type: "SetFilter"; value: string }
  | { type: "SetSort"; key: SortKey }
  | { type: "ToggleSortDir" }
  | { type: "AddSymbol"; id: string }
  | { type: "RemoveSymbol"; id: string }
  | { type: "FetchQuotes" }
  | { type: "QuotesFetched"; quotes: Record<string, Quote> }
  | { type: "QuotesFailed"; error: string }
  | { type: "TogglePolling" };
