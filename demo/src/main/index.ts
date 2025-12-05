import type { Program, Dispatch, VChild } from "algebraic-fx";
import { init } from "./model";
import { update } from "./update";
import { view as viewImpl } from "./view";
import type { Model, Msg } from "./types";

export const view = (
  model: Model,
  dispatch: Dispatch<Msg>
): VChild[] => viewImpl(model, dispatch);

export const program: Program<Model, Msg> = {
  init,
  update,
  view,
};

export type { Model, Msg };
