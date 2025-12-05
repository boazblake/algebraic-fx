import { IO } from "algebraic-fx";
import type { Program } from "algebraic-fx";
import { init } from "./model";
import { update } from "./update";
import { view } from "./view";
import type { Model, Msg } from "./types";

export const program: Program<Model, Msg> = {
  init,
  update,
  view,
};

export type { Model, Msg };
