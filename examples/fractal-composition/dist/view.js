import { div } from "./renderer";
import { program as CounterApp } from "./apps/counter/program";
import { program as TodoApp } from "./apps/todo/program";
import { program as WeatherApp } from "./apps/weather/program";
export const view = (m, dispatch) => div({ class: "grid grid-cols-3 gap-4 p-6" }, [
    CounterApp.view(m.counter, (msg) => dispatch({ type: "Counter", msg })),
    TodoApp.view(m.todo, (msg) => dispatch({ type: "Todo", msg })),
    WeatherApp.view(m.weather, (msg) => dispatch({ type: "Weather", msg })),
]);
