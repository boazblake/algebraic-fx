import { div, h1, button, p } from "./renderer";
import type { Model, Msg } from "./types";

export const view = (m: Model, dispatch: (msg: Msg) => void) =>
  div({ className: "p-6 text-center space-y-4" }, [
    h1({ className: "text-3xl font-bold" }, `Count: ${m.count}`),
    div({ className: "space-x-3" }, [
      button(
        {
          className: "bg-blue-600 text-white px-4 py-2 rounded",
          onclick: () => dispatch({ type: "INCREMENT" }),
        },
        "+"
      ),
      button(
        {
          className: "bg-red-600 text-white px-4 py-2 rounded",
          onclick: () => dispatch({ type: "DECREMENT" }),
        },
        "−"
      ),
    ]),
    button(
      {
        className: "bg-gray-800 text-white px-4 py-2 rounded",
        onclick: () => dispatch({ type: "TOGGLE_THEME" }),
      },
      `Theme: ${m.theme}`
    ),
    p(
      { className: "text-sm text-gray-500" },
      `Viewport: ${m.width} × ${m.height}`
    ),
  ]);
