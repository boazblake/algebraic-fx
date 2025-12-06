// src/panels/targets/index.ts
import type { Program, RawEffect } from "algebraic-fx";
import type { AppEnv } from "@core/env";

import { init } from "./init";
import { update } from "./update";
import { view } from "./view";
import type { Model, Msg } from "./types";

export const program: Program<Model, Msg, AppEnv> = {
  init: init as any as typeof init & RawEffect<AppEnv>,
  update: update as any,
  view,
};
