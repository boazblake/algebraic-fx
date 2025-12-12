import type { Dispatch, RawEffect } from "algebraic-fx";
import type { AppEnv } from "../env";
import type { HoldingsModel, HoldingsMsg } from "../features/holdings/types";
import type { TargetsModel, TargetsMsg } from "../features/targets/types";
import type { AuditModel, AuditMsg } from "../features/audit/types";
import type { CounterModel, CounterMsg } from "../features/counter/types";
import type { TodosModel, TodosMsg } from "../features/todos/types";
import type { WeatherModel, WeatherMsg } from "../features/weather/types";
import type { StreamModel, StreamMsg } from "../features/stream/types";

export type Model = {
  holdings: HoldingsModel;
  targets: TargetsModel;
  audit: AuditModel;
  counter: CounterModel;
  todos: TodosModel;
  weather: WeatherModel;
  stream: StreamModel;
};

export type Msg =
  | { type: "Holdings"; msg: HoldingsMsg }
  | { type: "Targets"; msg: TargetsMsg }
  | { type: "Audit"; msg: AuditMsg }
  | { type: "Counter"; msg: CounterMsg }
  | { type: "Todos"; msg: TodosMsg }
  | { type: "Weather"; msg: WeatherMsg }
  | { type: "Stream"; msg: StreamMsg };

export type AppEffect = RawEffect<AppEnv>;
export type AppEffects = AppEffect[];

export type AppDispatch = Dispatch<Msg>;
