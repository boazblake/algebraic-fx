import type { Program } from "algebraic-fx";
import { init } from "./model";
import { update } from "./update";
import { view as viewImpl } from "./view";
import type { Model, Msg } from "./types";

export const view = viewImpl;

export const program: Program<Model, Msg> = {
  init,
  update,
  view,
};

export type { Model, Msg };
