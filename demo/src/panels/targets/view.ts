// src/panels/targets/view.ts
import type { Dispatch } from "algebraic-fx";
import { m } from "@core/renderer";
import type { Model, Msg } from "./types";
import { toViewModel } from "./model";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const vm = toViewModel(model, dispatch);

  const errorNodes =
    vm.errors.length > 0
      ? [
          m(
            "ul",
            { style: "color: var(--pico-del-color); margin-top: 0.5rem;" },
            vm.errors.map((msg) => m("li", msg))
          ),
        ]
      : [];

  return m("div", [
    m("div", { class: "grid", style: "grid-template-columns: 1fr 3fr;" }, [
      m("label", { for: "stocks-slider" }, "Stocks"),
      m("input", {
        id: "stocks-slider",
        type: "range",
        min: 0,
        max: 100,
        value: vm.stocks,
        oninput: (e: any) =>
          vm.setStocks(Number((e.target as HTMLInputElement).value)),
      }),
    ]),
    m("small", `Stocks: ${vm.formatted.stocks}`),

    m("div", { class: "grid", style: "grid-template-columns: 1fr 3fr;" }, [
      m("label", { for: "bonds-slider" }, "Bonds"),
      m("input", {
        id: "bonds-slider",
        type: "range",
        min: 0,
        max: 100,
        value: vm.bonds,
        oninput: (e: any) =>
          vm.setBonds(Number((e.target as HTMLInputElement).value)),
      }),
    ]),
    m("small", `Bonds: ${vm.formatted.bonds}`),

    m("div", { class: "grid", style: "grid-template-columns: 1fr 3fr;" }, [
      m("label", { for: "cash-slider" }, "Cash"),
      m("input", {
        id: "cash-slider",
        type: "range",
        min: 0,
        max: 100,
        value: vm.cash,
        oninput: (e: any) =>
          vm.setCash(Number((e.target as HTMLInputElement).value)),
      }),
    ]),
    m("small", `Cash: ${vm.formatted.cash}`),

    m("p", { style: "margin-top: 0.5rem;" }, [
      m("strong", "Total: "),
      `${vm.total}%`,
    ]),

    m("div", { class: "grid", style: "margin-top: 0.75rem;" }, [
      m(
        "button",
        {
          onclick: vm.apply,
          disabled: !vm.canApply,
        },
        "Apply target"
      ),
      m(
        "button",
        {
          class: "secondary outline",
          onclick: vm.reset,
        },
        "Reset to 60/30/10"
      ),
    ]),

    ...errorNodes,
  ]);
};
