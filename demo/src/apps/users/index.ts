import type { Program } from "algebraic-fx/core/types";
import type { AppEnv } from "../../env";

import { init } from "./init";
import { update } from "./update";
import { view } from "./view";
import type { Model, Msg } from "./types";

export const usersApp: Program<Model, Msg, AppEnv> = {
  init,
  update,
  view,
};
