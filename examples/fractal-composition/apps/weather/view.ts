import { div, h1, button, p, input } from "../../renderer";
import type { Model, Msg } from "./model";

export const view = (m: Model, dispatch: (msg: Msg) => void) =>
  div({ class: "flex flex-col space-y-4" }, [
    h1({ class: "text-lg font-semibold text-emerald-600" }, "Weather"),

    div({ class: "flex space-x-2" }, [
      input({
        class:
          "flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500",
        value: m.city,
        placeholder: "Enter city...",
        oninput: (e: any) =>
          dispatch({ type: "SET_CITY", city: e.target.value }),
      }),
      button(
        {
          class:
            "bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow transition",
          onclick: () => dispatch({ type: "FETCH" }),
        },
        "Get Weather"
      ),
    ]),

    m.loading
      ? p({ class: "text-gray-500 text-sm" }, "Loading...")
      : m.data
      ? div({ class: "text-sm space-y-1 text-gray-700" }, [
          p({}, `🌡 ${m.data.temperature}°C`),
          p({}, `💨 ${m.data.wind} km/h wind`),
        ])
      : p({ class: "text-gray-400 text-sm italic" }, "No data yet."),
  ]);
