import type {
  Model as CounterModel,
  Msg as CounterMsg,
} from "../apps/counter/types";
import type { Model as ClockModel, Msg as ClockMsg } from "../apps/clock/types";
import type { Model as UsersModel, Msg as UsersMsg } from "../apps/users/types";

export type Model = {
  counter: CounterModel;
  clock: ClockModel;
  users: UsersModel;
};

export type Msg = CounterMsg | ClockMsg | UsersMsg;
