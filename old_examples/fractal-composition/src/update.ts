import { IO, type EffectLike } from "effects-vdom";
import type { Msg, Model } from "./types";

import { program as CounterApp } from "./apps/counter/program";
import { program as TodoApp } from "./apps/todo/program";
import { program as WeatherApp } from "./apps/weather/program";

/** Helper: safely merge sub-effects, lifting dispatch */
const mapEffects = (effects: EffectLike[] = []): EffectLike[] =>
  effects.map((fx) =>
    IO(() => {
      if (fx?.run) fx.run();
    })
  );

/** Helper: lift child app updates to parent program */
const liftUpdate = <SubModel, SubMsg>(
  childUpdate: (
    msg: SubMsg,
    model: SubModel,
    dispatch: (msg: SubMsg) => void
  ) => {
    model: SubModel;
    effects: EffectLike[];
  },
  key: keyof Model,
  wrap: (sub: SubMsg) => Msg
) => {
  return (msg: any, m: Model, dispatch: (msg: Msg) => void) => {
    const { model, effects } = childUpdate(
      msg.msg,
      m[key] as SubModel,
      (sub: SubMsg) => dispatch(wrap(sub))
    );
    return {
      model: { ...m, [key]: model },
      effects: mapEffects(effects),
    };
  };
};

/** Main fractal update */
export const update = (msg: Msg, m: Model, dispatch: (msg: Msg) => void) => {
  switch (msg.type) {
    case "REFRESH_ALL": {
      const weatherFetch = WeatherApp.update(
        { type: "FETCH" } as any,
        m.weather,
        dispatch
      );
      const todosFetch = TodoApp.update(
        { type: "FETCH_ALL" } as any,
        m.todo,
        dispatch
      );

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
