import { m } from "algebraic-fx";
import type { Holding } from "../holdings/types";
import type { Target } from "../targets/types";

export const view = (holdings: Holding[], targets: Target[]) => {
  const totalValue = holdings.reduce((acc: number, h: Holding) => {
    if (h.price == null) return acc;
    return acc + h.price * h.shares;
  }, 0);

  const rows = targets.map((t) => {
    const holding = holdings.find((h: Holding) => h.symbol === t.symbol);
    const currentValue =
      holding && holding.price != null ? holding.price * holding.shares : 0;
    const currentPct = totalValue > 0 ? (currentValue / totalValue) * 100 : 0;
    const delta = currentPct - t.targetPercent;
    return {
      symbol: t.symbol,
      target: t.targetPercent,
      current: currentPct,
      delta,
    };
  });

  return m("section", [
    m("h2", "Summary"),
    m("p", `Total portfolio value: $${totalValue.toFixed(2)}`),
    m("table", [
      m("thead", [
        m("tr", [
          m("th", "Symbol"),
          m("th.text-right", "Target %"),
          m("th.text-right", "Current %"),
          m("th.text-right", "Delta %"),
        ]),
      ]),
      m(
        "tbody",
        rows.length === 0
          ? m("tr", [m("td", { colspan: 4 }, "No targets defined yet.")])
          : rows.map((r) =>
              m("tr", { key: r.symbol }, [
                m("td", r.symbol),
                m("td.text-right", `${r.target.toFixed(1)}%`),
                m("td.text-right", `${r.current.toFixed(1)}%`),
                m("td.text-right", `${r.delta.toFixed(1)}%`),
              ])
            )
      ),
    ]),
  ]);
};
