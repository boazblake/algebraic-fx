import type { Program } from "algebraic-fx/core/types";
import type { AppEnv } from "../env";

import { init } from "./init";
import { update, type Model, type Msg } from "./update";
import { view } from "./view";
import { subs } from "./subs";

export const program: Program<Model, Msg, AppEnv> = {
  init,
  update,
  view,
  subs,
};
