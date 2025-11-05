import { IO } from "effects-vdom";
import { program as CounterApp } from "./apps/counter/program";
import { program as TodoApp } from "./apps/todo/program";
import { program as WeatherApp } from "./apps/weather/program";
/** Helper: safely merge sub-effects, lifting dispatch */
const mapEffects = (effects = []) => effects.map((fx) => IO(() => {
    if (fx?.run)
        fx.run();
}));
/** Helper: lift child app updates to parent program */
const liftUpdate = (childUpdate, key, wrap) => {
    return (msg, m, dispatch) => {
        const { model, effects } = childUpdate(msg.msg, m[key], (sub) => dispatch(wrap(sub)));
        return {
            model: { ...m, [key]: model },
            effects: mapEffects(effects),
        };
    };
};
/** Main fractal update */
export const update = (msg, m, dispatch) => {
    switch (msg.type) {
        case "REFRESH_ALL": {
            const weatherFetch = WeatherApp.update({ type: "FETCH" }, m.weather, dispatch);
            const todosFetch = TodoApp.update({ type: "FETCH_ALL" }, m.todo, dispatch);
            return {
                model: {
                    ...m,
                    weather: weatherFetch.model,
                    todo: todosFetch.model,
                },
                effects: [
                    ...(weatherFetch.effects ?? []),
                    ...(todosFetch.effects ?? []),
                ],
            };
        }
        case "ALL_FETCHED": {
            const log = IO(() => console.log("Fetched all apps:", msg.results));
            return { model: m, effects: [log] };
        }
        case "Counter": {
            const lifted = liftUpdate(CounterApp.update, "counter", (sub) => ({
                type: "Counter",
                msg: sub,
            }))(msg, m, dispatch);
            return lifted;
        }
        case "Todo": {
            const lifted = liftUpdate(TodoApp.update, "todo", (sub) => ({
                type: "Todo",
                msg: sub,
            }))(msg, m, dispatch);
            return lifted;
        }
        case "Weather": {
            const lifted = liftUpdate(WeatherApp.update, "weather", (sub) => ({
                type: "Weather",
                msg: sub,
            }))(msg, m, dispatch);
            return lifted;
        }
        default:
            return { model: m, effects: [] };
    }
};
