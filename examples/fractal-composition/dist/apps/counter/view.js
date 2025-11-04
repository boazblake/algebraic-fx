import { div, button, h1 } from "../../renderer";
export const view = (m, dispatch) => div({ class: "p-4 border rounded" }, [
    h1({}, `Count: ${m.count}`),
    button({ onclick: () => dispatch({ type: "INC" }) }, "+"),
    button({ onclick: () => dispatch({ type: "DEC" }) }, "-"),
    button({ onclick: () => dispatch({ type: "RESET" }) }, "Reset"),
]);
