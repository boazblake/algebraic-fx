import { div, h1, input, button, ul, li, span } from "../../renderer";
export const view = (m, dispatch) => div({ class: "p-4 border rounded" }, [
    h1({}, "Todos"),
    div({}, [
        input({
            value: m.input,
            oninput: (e) => dispatch({ type: "SET_INPUT", value: e.target.value }),
        }),
        button({ onclick: () => dispatch({ type: "ADD" }) }, "Add"),
    ]),
    ul({}, m.todos.map((t) => li({
        onclick: () => dispatch({ type: "TOGGLE", id: t.id }),
        class: t.done ? "line-through text-gray-400" : "",
    }, span({}, t.text)))),
]);
