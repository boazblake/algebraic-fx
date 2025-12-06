// src/panels/targets/effects.ts
import { IO } from "algebraic-fx";
import { Reader } from "algebraic-fx";
import { Maybe } from "algebraic-fx";
import type { Dispatch } from "algebraic-fx";
import type { AppEnv } from "@core/env";

import type { Msg } from "./types";
import type { TargetAllocation } from "@shared/types";
import { loadTarget } from "@effects/storage";
import { defaultTarget } from "./domain";

export const loadTargetEffect = (
  dispatch: Dispatch<Msg>
): Reader<AppEnv, IO<void>> =>
  Reader((env: AppEnv) =>
    IO(() => {
      const ioMaybe = loadTarget.run(env);
      const maybe = ioMaybe.run();
      const target = Maybe.getOrElse<TargetAllocation>(defaultTarget, maybe);
      dispatch({ type: "LOADED_TARGET", target });
    })
  );
