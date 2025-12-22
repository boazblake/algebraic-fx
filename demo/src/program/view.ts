// src/program/view.ts

import { m } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx/core/types";
import type { Model, Msg } from "./types";
import { view as clockView } from "../apps/clock/view";

export const view = (model: Model, dispatch: Dispatch<Msg>) =>
  m("div.app", [clockView(model.clock, dispatch)]);
