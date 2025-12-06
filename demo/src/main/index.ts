import { IO } from "algebraic-fx";
import type { RawEffect, Program } from "algebraic-fx";
import type { AppEnv } from "@core/env";

import type { Model, Msg } from "./types";
import { init } from "./init";
import { update } from "./update";
import { view } from "./view";

export const program: Program<Model, Msg, AppEnv> = {
  init: init as IO<{ model: Model; effects: RawEffect<AppEnv>[] }>,
  update,
  view,
};
