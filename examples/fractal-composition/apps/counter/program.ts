import { IO } from "effects-vdom";
import { init } from "./model";
import { update } from "./update";
import { view } from "./view";
import type { Program } from "effects-vdom";
import type { Model } from "./model";
import type { Msg } from "./update";

export const program: Program<Model, Msg> = {
  init: IO(() => init),
  update,
  view,
};
export type { Model, Msg };
