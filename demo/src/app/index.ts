// src/app/index.ts
import type { Program } from "algebraic-fx";
import type { AppEnv } from "../core/env";
import { init } from "./init";
import { update } from "./update";
import { view } from "./view";
import type { Model, Msg } from "./types";

export const program: Program<Model, Msg, AppEnv> = {
  init,
  update,
  view,
};
