import { m, type Dispatch } from "algebraic-fx";
import type { TargetsModel, TargetsMsg, Target } from "./types";

const viewRow = (t: Target, dispatch: Dispatch<TargetsMsg>) =>
  m("tr", [
    m("td", t.symbol),
    m("td.text-right", `${t.targetPercent.toFixed(1)}%`),
    m(
      "td.text-right",
      m(
        "button",
        {
          type: "button",
          onclick: () =>
            dispatch({
              type: "Remove",
              symbol: t.symbol,
            }),
        },
        "Remove"
      )
    ),
  ]);

export const view = (model: TargetsModel, dispatch: Dispatch<TargetsMsg>) => {
  const onSymbolInput = (e: Event): void => {
    const value = (e.target as HTMLInputElement).value;
    dispatch({ type: "InputSymbol", value });
  };

  const onPercentInput = (e: Event): void => {
    const value = (e.target as HTMLInputElement).value;
    dispatch({ type: "InputPercent", value });
  };

  const totalPercent = model.items.reduce((acc, t) => acc + t.targetPercent, 0);

  return m("section", [
    m("h2", "Targets"),
    m("form", { onsubmit: (e: Event) => e.preventDefault() }, [
      m("label", [
        "Symbol",
        m("input", {
          value: model.inputSymbol,
          oninput: onSymbolInput,
        }),
      ]),
      m("label", [
        "Target %",
        m("input", {
          value: model.inputPercent,
          oninput: onPercentInput,
        }),
      ]),
      m(
        "button",
        {
          type: "button",
          onclick: () => dispatch({ type: "Add" }),
        },
        "Add"
      ),
    ]),
    m("table", [
      m("thead", [
        m("tr", [m("th", "Symbol"), m("th.text-right", "Target %"), m("th")]),
      ]),
      m(
        "tbody",
        model.items.length === 0
          ? m("tr", [
              m(
                "td",
                { colspan: 3 },
                "No targets yet. Add desired allocations."
              ),
            ])
          : model.items.map((t) => viewRow(t, dispatch))
      ),
    ]),
    m("p", `Total target: ${totalPercent.toFixed(1)}%`),
  ]);
};
