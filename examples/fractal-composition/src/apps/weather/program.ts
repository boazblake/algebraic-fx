import { type Program, IO } from "effects-vdom";
import { update } from "./update";
import { view } from "./view";
import { init } from "./model";
import { Model, Msg } from "./types";

export const program: Program<Model, Msg> = {
  init: IO(() => init),
  update,
  view,
};
