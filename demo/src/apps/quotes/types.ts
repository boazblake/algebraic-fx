export type Quote = {
  id: string;
  usd: number;
  lastUpdatedMs: number;
};

export type SortKey = "usd" | "id";
export type SortDir = "asc" | "desc";
