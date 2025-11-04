import type { Model, Msg } from "./types";

export const update = (msg: Msg, m: Model) => {
  switch (msg.type) {
    case "INCREMENT":
      return { model: { ...m, count: m.count + 1 } };

    case "DECREMENT":
      return { model: { ...m, count: m.count - 1 } };

    case "TOGGLE_THEME": {
      const next = m.theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      return { model: { ...m, theme: next } };
    }

    case "RESIZE":
      return { model: { ...m, width: msg.width, height: msg.height } };

    default:
      return { model: m };
  }
};
