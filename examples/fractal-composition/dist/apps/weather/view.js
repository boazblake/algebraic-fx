import { div, h1, input, button, p } from "../../renderer";
export const view = (m, dispatch) => div({ class: "p-3 border rounded space-y-2" }, [
    h1({}, "Weather"),
    input({
        value: m.city,
        oninput: (e) => dispatch({ type: "SET_CITY", city: e.target.value }),
    }),
    button({ onclick: () => dispatch({ type: "FETCH" }) }, m.loading ? "loading..." : "fetch"),
    p({}, m.data ? JSON.stringify(m.data) : ""),
]);
