import { init } from "./model/init";
import { update } from "./model/update";
import { Layout } from "./views/Layout";
import type { Model, Msg } from "./model/types";
import type { Program } from "effects-vdom";

export const program: Program<Model, Msg> = {
  init,
  update,
  view: Layout,
};
