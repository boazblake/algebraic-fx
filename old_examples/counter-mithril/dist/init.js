import { IO } from "effects-vdom";
const registerGlobalIO = (dispatch) => [
    IO(() => window.addEventListener("resize", () => dispatch({
        type: "RESIZE",
        width: window.innerWidth,
        height: window.innerHeight,
    }))),
];
export const init = IO(() => {
    const model = {
        count: 0,
        theme: "light",
        width: window.innerWidth,
        height: window.innerHeight,
    };
    return {
        model,
        effects: registerGlobalIO((msg) => window.dispatchEvent(new CustomEvent("APP_MSG", { detail: msg }))),
    };
});
