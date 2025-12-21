import type { Quote, SortKey, SortDir } from "./types";
import type { Model } from "./init";

export type Row = {
  id: string;
  usd: number;
  updatedLabel: string;
};

export const selectVisibleRows = (model: Model): Row[] => {
  const rows = Object.values(model.quotes);

  const filtered = model.filter
    ? rows.filter((r) =>
        r.id.toLowerCase().includes(model.filter.toLowerCase())
      )
    : rows;

  const sorted = [...filtered].sort((a, b) => {
    const dir = model.sortDir === "asc" ? 1 : -1;
    if (model.sortKey === "usd") return dir * (a.usd - b.usd);
    return dir * a.id.localeCompare(b.id);
  });

  return sorted.map((r) => ({
    id: r.id,
    usd: r.usd,
    updatedLabel: new Date(r.lastUpdatedMs).toLocaleTimeString(),
  }));
};
