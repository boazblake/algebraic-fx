import { Either, httpTask, IO } from "effects-vdom";
import { div, h1, input, button, p } from "../../renderer";
/** Init */
export const init = {
    run: () => ({
        model: { city: "London", loading: false, env: { fetch } },
        effects: [],
    }),
};
const fetchWeather = (city, env, dispatch) => httpTask(`https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=0.1&current_weather=true`)
    .run({ fetch: env.fetch, baseUrl: "" })
    .map((result) => IO(() => {
    if (Either.isRight(result)) {
        dispatch({ type: "FETCH_OK", data: result.right });
    }
    else {
        const err = result.left;
        dispatch({
            type: "FETCH_ERR",
            error: typeof err.status === "number"
                ? err
                : { status: 0, message: err?.message ?? "Unknown error" },
        });
    }
}));
/** Update */
export const update = (msg, m, dispatch) => {
    switch (msg.type) {
        case "SET_CITY":
            return { model: { ...m, city: msg.city }, effects: [] };
        case "FETCH": {
            const effect = fetchWeather(m.city, m.env, dispatch);
            return { model: { ...m, loading: true }, effects: [effect] };
        }
        case "FETCH_OK":
            return { model: { ...m, loading: false, data: msg.data }, effects: [] };
        case "FETCH_ERR":
            return { model: { ...m, loading: false, data: { error: msg.error } }, effects: [] };
        default:
            return { model: m, effects: [] };
    }
};
/** View */
export const view = (m, dispatch) => div({ class: "p-3 border rounded space-y-2" }, [
    h1({}, "Weather"),
    input({
        value: m.city,
        oninput: (e) => dispatch({ type: "SET_CITY", city: e.target.value }),
    }),
    button({ onclick: () => dispatch({ type: "FETCH" }) }, m.loading ? "Loading..." : "Fetch"),
    p({}, m.data ? JSON.stringify(m.data) : ""),
]);
/** Program */
export const program = { init, update, view };
