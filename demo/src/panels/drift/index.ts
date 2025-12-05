import type { Program } from "algebraic-fx";
import type { Model, Msg } from "./types";
import { init } from "./model";
import { update } from "./update";
import { view } from "./view";

export const program: Program<Model, Msg> = {
  init,
  update,
  view,
};

export type { Model, Msg };
