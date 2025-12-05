import type { Dispatch } from "algebraic-fx";
import { m } from "../../utils/renderer";
import type { Model, Msg } from "./types";
import { formatPercent } from "../../shared/calculations";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
console.log('taregts',model)
  const { stocks, bonds, cash } = model.target;
  const total = stocks + bonds + cash;

  const errors =
    model.validationErrors.length > 0
      ? [
          m(
            "ul",
            { style: "color: var(--pico-del-color); margin-top: 0.5rem;" },
            model.validationErrors.map((err) =>
              m("li", `${err.field}: ${err.message}`)
            )
          ),
        ]
      : [];

  return  m("div", [
      // sliders
      m("div", { class: "grid", style: "grid-template-columns: 1fr 3fr;" }, [
        m("label", { for: "stocks-slider" }, "Stocks"),
        m("input", {
          id: "stocks-slider",
          type: "range",
          min: 0,
          max: 100,
          value: stocks,
          oninput: (e: any) =>
            dispatch({ type: "SET_STOCKS", value: Number(e.target.value) }),
        }),
      ]),
      m("small", `Stocks: ${formatPercent(stocks)}`),

      m("div", { class: "grid", style: "grid-template-columns: 1fr 3fr;" }, [
        m("label", { for: "bonds-slider" }, "Bonds"),
        m("input", {
          id: "bonds-slider",
          type: "range",
          min: 0,
          max: 100,
          value: bonds,
          oninput: (e: any) =>
            dispatch({ type: "SET_BONDS", value: Number(e.target.value) }),
        }),
      ]),
      m("small", `Bonds: ${formatPercent(bonds)}`),

      m("div", { class: "grid", style: "grid-template-columns: 1fr 3fr;" }, [
        m("label", { for: "cash-slider" }, "Cash"),
        m("input", {
          id: "cash-slider",
          type: "range",
          min: 0,
          max: 100,
          value: cash,
          oninput: (e: any) =>
            dispatch({ type: "SET_CASH", value: Number(e.target.value) }),
        }),
      ]),
      m("small", `Cash: ${formatPercent(cash)}`),

      m("p", { style: "margin-top: 0.5rem;" }, [
        m("strong", "Total: "),
        `${total}%`,
      ]),

      m("div", { class: "grid", style: "margin-top: 0.75rem;" }, [
        m(
          "button",
          {
            onclick: () => dispatch({ type: "APPLY" }),
          },
          "Apply target"
        ),
        m(
          "button",
          {
            class: "secondary outline",
            onclick: () => dispatch({ type: "RESET_DEFAULT" }),
          },
          "Reset to 60/30/10"
        ),
      ]),

      ...errors,
    ])
};
