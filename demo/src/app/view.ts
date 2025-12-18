// src/app/view.ts
import type { Model, Msg } from "./types";
import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div", [
    m("h1", "FP-Rebalance Example Program"),

    m("div", [
      m("button", { onclick: () => dispatch({ type: "INC" }) }, "+"),
      m("span", { style: "padding:0 1rem;" }, String(model.count)),
      m("button", { onclick: () => dispatch({ type: "DEC" }) }, "-"),
    ]),

    m(
      "button",
      { onclick: () => dispatch({ type: "LOAD" }) },
      "Load async message"
    ),

    model.message && m("p", `Message: ${model.message}`),
  ]);
