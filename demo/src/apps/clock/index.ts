import type { Program } from "algebraic-fx/core/types";
import type { AppEnv } from "../../env";

import { init } from "./init";
import { update } from "./update";
import { view } from "./view";
import { subs } from "./subs";

import type { Model, Msg } from "./model";

export const clockApp: Program<Model, Msg, AppEnv> = { init, update, view };
export { subs };
export type { Model, Msg };
