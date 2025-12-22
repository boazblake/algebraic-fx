import type { Model, Quote, SortDir, SortKey } from "./types";

export const normalize = (s: string): string => s.trim().toUpperCase();

export const toggleDir = (d: SortDir): SortDir =>
  d === "asc" ? "desc" : "asc";

export const nextSort = (
  model: Model,
  key: SortKey
): { sortKey: SortKey; sortDir: SortDir } =>
  model.sortKey === key
    ? { sortKey: key, sortDir: toggleDir(model.sortDir) }
    : { sortKey: key, sortDir: "desc" };

export const visibleSymbols = (model: Model): string[] => {
  const f = model.filter.trim().toUpperCase();
  return f.length === 0
    ? model.watchlist
    : model.watchlist.filter((s) => s.includes(f));
};

export const sortedRows = (model: Model): Quote[] => {
  const qs = visibleSymbols(model)
    .map((s) => model.quotes[s])
    .filter((q): q is Quote => !!q);

  const dir = model.sortDir === "asc" ? 1 : -1;

  return qs.sort((a, b) => {
    switch (model.sortKey) {
      case "symbol":
        return a.symbol.localeCompare(b.symbol) * dir;
      case "ts":
        return (a.ts - b.ts) * dir;
      case "usd":
      default:
        return (a.usd - b.usd) * dir;
    }
  });
};
