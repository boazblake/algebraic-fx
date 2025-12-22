import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./types";

import { view as counterView } from "../apps/counter/view";
import { view as clockView } from "../apps/clock/view";
import { view as usersView } from "../apps/users/view";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div.app", [
    counterView(model.counter, dispatch),
    clockView(model.clock, dispatch),
    usersView(model.users, dispatch),
  ]);
