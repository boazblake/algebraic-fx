import type { DriftReport } from "@shared/types";

export type DriftVM = {
  asset: string;
  current: string;
  target: string;
  drift: string;
  driftClass: string;
};

const classifyDrift = (d: number): string =>
  Math.abs(d) < 1
    ? "drift-green"
    : Math.abs(d) <= 5
      ? "drift-yellow"
      : "drift-red";

export const toViewModel = (r: DriftReport | null): DriftVM[] => {
  if (!r) return [];

  return [
    {
      asset: "Stocks",
      current: r.current.stocks.toFixed(1) + "%",
      target: r.target.stocks.toFixed(1) + "%",
      drift: r.drift.stocks.toFixed(1) + "%",
      driftClass: classifyDrift(r.drift.stocks),
    },
    {
      asset: "Bonds",
      current: r.current.bonds.toFixed(1) + "%",
      target: r.target.bonds.toFixed(1) + "%",
      drift: r.drift.bonds.toFixed(1) + "%",
      driftClass: classifyDrift(r.drift.bonds),
    },
    {
      asset: "Cash",
      current: r.current.cash.toFixed(1) + "%",
      target: r.target.cash.toFixed(1) + "%",
      drift: r.drift.cash.toFixed(1) + "%",
      driftClass: classifyDrift(r.drift.cash),
    },
  ];
};
