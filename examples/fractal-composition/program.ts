import type { Program, Dispatch, EffectLike } from "effects-vdom";
import { program as CounterApp } from "./apps/counter/program";
import { program as TodoApp } from "./apps/todo/program";
import { program as WeatherApp } from "./apps/weather/program";
import type { Model } from "./model";
import {view} from './view'

export type Msg =
  | { type: "Counter"; msg: Parameters<typeof CounterApp.update>[0] }
  | { type: "Todo"; msg: Parameters<typeof TodoApp.update>[0] }
  | { type: "Weather"; msg: Parameters<typeof WeatherApp.update>[0] };

export const init = {
  run: (): { model: Model; effects: EffectLike[] } => {
    const c0 = CounterApp.init.run().model;
    const t0 = TodoApp.init.run().model;
    const w0 = WeatherApp.init.run().model;
    return { model: { counter: c0, todo: t0, weather: w0 }, effects: [] };
  },
};

export const update = (msg: Msg, m: Model, dispatch: Dispatch) => {
  switch (msg.type) {
    case "Counter": {
      const { model } = CounterApp.update(msg.msg, m.counter, (sub) =>
        dispatch({ type: "Counter", msg: sub })
      );
      return { model: { ...m, counter: model }, effects: [] };
    }
    case "Todo": {
      const { model } = TodoApp.update(msg.msg, m.todo, (sub) =>
        dispatch({ type: "Todo", msg: sub })
      );
      return { model: { ...m, todo: model }, effects: [] };
    }
    case "Weather": {
      const { model, effects } = WeatherApp.update(msg.msg, m.weather, (sub) =>
        dispatch({ type: "Weather", msg: sub })
      );
      return { model: { ...m, weather: model }, effects:[] };
    }
    default:
      return { model: m, effects: [] };
  }
};

export const program: Program<Model, Msg> = { init, update, view };
