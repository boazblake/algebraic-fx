import { Task, IO, Either } from "effects-vdom";
import { program as CounterApp } from "./apps/counter/program";
import { program as TodoApp } from "./apps/todo/program";
import { program as WeatherApp } from "./apps/weather/program";
export const update = (msg, m, dispatch) => {
    switch (msg.type) {
        case "REFRESH_ALL": {
            // collect weather + todos (pretend each returns a Task)
            const weatherTask = Task(async () => {
                const res = await WeatherApp.update({ type: "FETCH" }, m.weather, () => { }).effects?.[0]?.run?.();
                return res || Either.Right("weather ok");
            });
            const todosTask = Task(async () => Either.Right("todos ok"));
            const combined = Task.sequence([weatherTask, todosTask]);
            const io = IO(async () => {
                const results = await combined.run();
                dispatch({ type: "ALL_FETCHED", results });
            });
            return { model: m, effects: [io] };
        }
        case "ALL_FETCHED": {
            const logs = IO(() => console.log("Fetched all apps:", msg.results));
            return { model: m, effects: [logs] };
        }
        // existing delegation logic
        case "Counter": {
            const { model: counter } = CounterApp.update(msg.msg, m.counter, (sub) => dispatch({ type: "Counter", msg: sub }));
            return { model: { ...m, counter }, effects: [] };
        }
        case "Todo": {
            const { model: todo } = TodoApp.update(msg.msg, m.todo, (sub) => dispatch({ type: "Todo", msg: sub }));
            return { model: { ...m, todo }, effects: [] };
        }
        case "Weather": {
            const { model: weather } = WeatherApp.update(msg.msg, m.weather, (sub) => dispatch({ type: "Weather", msg: sub }));
            return { model: { ...m, weather }, effects: [] };
        }
        default:
            return { model: m, effects: [] };
    }
};
