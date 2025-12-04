import { program as CounterApp } from "./apps/counter/program";
import { program as TodoApp } from "./apps/todo/program";
import { program as WeatherApp } from "./apps/weather/program";
import { IO } from "effects-vdom";

export const init = IO(() => {
  const c0 = CounterApp.init.run().model;
  const t0 = TodoApp.init.run().model;
  const w0 = WeatherApp.init.run().model;

  return { model: { counter: c0, todo: t0, weather: w0 }, effects: [] };
});
