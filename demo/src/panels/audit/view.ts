import { m } from "../../utils/renderer";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
console.log('audit',model)
  return m("div", [
    m("div", { style: "display:flex; gap:0.5rem; margin-bottom:0.5rem;" }, [
      m(
        "button",
        {
          type: "button",
          class: "secondary",
          onclick: () => dispatch({ type: "EXPORT_JSON" }),
        },
        "Export JSON"
      ),
      model.entries.length > 0 ?
        m(
          "button",
          {
            type: "button",
            class: "secondary outline",
            onclick: () => dispatch({ type: "CLEAR" }),
          },
          "Clear"
        ):null,
    ]),
    model.entries.length === 0
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
          model.entries.map((e, idx) =>
            m("details", { key: idx }, [
              m(
                "summary",
                `[${e.timestamp}] ${e.operation} (${e.success ? "ok" : "error"})`
              ),
              m(
                "pre",
                {
                  style:
                    "white-space: pre-wrap; word-break: break-word; margin-top:0.25rem;",
                },
                JSON.stringify(e.details, null, 2)
              ),
            ])
          )
        ),
  ]);
};
