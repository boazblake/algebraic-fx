import type { Dispatch } from "algebraic-fx";
import { m } from "@core/renderer";
import type { Model, Msg } from "./types";
import { toViewModel } from "./model";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const vm = toViewModel(model, dispatch);

  return m("div", [
    m("div", { style: "display:flex; gap:0.5rem; margin-bottom:0.5rem;" }, [
      m(
        "button",
        { onclick: vm.exportJson, class: "secondary" },
        "Export JSON"
      ),

      vm.hasEntries
        ? m(
            "button",
            {
              onclick: vm.clear,
              class: "secondary outline",
            },
            "Clear"
          )
        : null,
    ]),

    !vm.hasEntries
      ? m(
          "p",
          { style: "color: var(--pico-muted-color);" },
          "No audit entries yet."
        )
      : m(
          "div",
          {
            style:
              "max-height: 260px; overflow-y: auto; font-size: 0.8rem; border: 1px solid var(--pico-muted-border-color); border-radius: 0.5rem; padding: 0.5rem;",
          },
          vm.entries.map((entry, idx) =>
            m("details", { key: idx }, [
              m("summary", entry.summary),
              m("pre", entry.details),
            ])
          )
        ),
  ]);
};
