import type { Program, Dispatch, EffectLike } from "effects-vdom";
import { program as CounterApp } from "./apps/counter/program";
import { program as TodoApp } from "./apps/todo/program";
import { program as WeatherApp } from "./apps/weather/program";
import type { Model, Msg } from "./types";
import { view } from "./view";
import { init } from "./model";
import { update } from "./update";

export const program: Program<Model, Msg> = { init, update, view };
