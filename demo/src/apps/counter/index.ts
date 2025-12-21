import type { Program } from "algebraic-fx/core/types";
import type { AppEnv } from "../../env";
import { init, type Model } from "./init";
import { update, type Msg } from "./update";
import { view } from "./view";

export const counterApp: Program<Model, Msg, AppEnv> = { init, update, view };
