import { m } from "../../utils/renderer";
import type { Model, Msg } from "./types";
import type { Dispatch } from "algebraic-fx";

export const view = (model: Model, dispatch: Dispatch<Msg>) => {
  const { stocks, bonds, cash } = model.target;
  const sum = stocks + bonds + cash;

  return m("div", [
    // Sliders
    m("div", { class: "grid", style: "gap: 0.5rem;" }, [
      m("label", [
        `Stocks ${stocks}%`,
        m("input", {
          type: "range",
          min: 0,
          max: 100,
          value: stocks,
          oninput: (e: any) =>
            dispatch({ type: "SET_STOCKS", value: Number(e.target.value) }),
        }),
      ]),
      m("label", [
        `Bonds ${bonds}%`,
        m("input", {
          type: "range",
          min: 0,
          max: 100,
          value: bonds,
          oninput: (e: any) =>
            dispatch({ type: "SET_BONDS", value: Number(e.target.value) }),
        }),
      ]),
      m("label", [
        `Cash ${cash}%`,
        m("input", {
          type: "range",
          min: 0,
          max: 100,
          value: cash,
          oninput: (e: any) =>
            dispatch({ type: "SET_CASH", value: Number(e.target.value) }),
        }),
      ]),
    ]),

    // Sum hint
    m(
      "p",
      {
        style:
          "margin-top: 0.5rem; font-size: 0.9rem; color: var(--pico-muted-color);",
      },
      `Total: ${sum}%`
    ),

    // Validation errors
    model.validationErrors.length > 0 &&
      m(
        "ul",
        { style: "color: var(--pico-del-color); margin-top: 0.5rem;" },
        model.validationErrors.map((err) =>
          m("li", `${err.field}: ${err.message}`)
        )
      ),

    // Apply button
    m(
      "button",
      {
        type: "button",
        style: "margin-top: 0.5rem;",
        onclick: () => dispatch({ type: "APPLY_TARGET" }),
      },
      "Save target allocation"
    ),
  ]);
};
