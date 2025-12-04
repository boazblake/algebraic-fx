import { program as CounterApp } from "./apps/counter/program";
import { program as TodoApp } from "./apps/todo/program";
import { program as WeatherApp } from "./apps/weather/program";
import type { Model as CounterModel } from "./apps/counter/types";
import type { Model as TodoModel } from "./apps/todo/types";
import type { Model as WeatherModel } from "./apps/weather/types";

export type DomEnv = {
  window: Window;
};

export type Model = {
  counter: CounterModel;
  todo: TodoModel;
  weather: WeatherModel;
};

export type Msg =
  | { type: "Counter"; msg: Parameters<typeof CounterApp.update>[0] }
  | { type: "Todo"; msg: Parameters<typeof TodoApp.update>[0] }
  | { type: "Weather"; msg: Parameters<typeof WeatherApp.update>[0] }
  | { type: "REFRESH_ALL" }
  | { type: "ALL_FETCHED"; results: any[] };
