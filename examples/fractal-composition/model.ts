import type { Model as Counter } from "./apps/counter/program";
import type { Model as Todo } from "./apps/todo/program";
import type { Model as Weather } from "./apps/weather/program";

export type Model = {
  counter: Counter;
  todo: Todo;
  weather: Weather;
};
