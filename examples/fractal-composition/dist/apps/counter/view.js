import { div, h1, button } from "../../utils/renderer";
export const view = (m, dispatch) => div({ className: "flex flex-col items-center space-y-4" }, [
    h1({ className: "text-5xl font-bold text-indigo-600" }, String(m.count)),
    div({ className: "flex space-x-3" }, [
        button({
            className: "bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow transition",
            onclick: () => dispatch({ type: "INC" }),
        }, "+"),
        button({
            className: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow transition",
            onclick: () => dispatch({ type: "DEC" }),
        }, "–"),
        button({
            className: "bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg shadow transition",
            onclick: () => dispatch({ type: "RESET" }),
        }, "Reset"),
    ]),
]);
