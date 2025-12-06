// src/panels/drift/update.ts
import type { Dispatch, RawEffect } from "algebraic-fx";
import type { AppEnv } from "@core/env";
import type { Model, Msg } from "./types";

export const update = (
  msg: Msg,
  model: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv>[] } => {
  switch (msg.type) {
    case "CALCULATE":
      console.log("driuft calculate", msg, model);
      // assuming you have domain logic elsewhere
      // const report = computeDriftReport(msg.holdings, msg.target);
      // return { model: { report }, effects: [] };
      return {
        model,
        effects: [],
      };

    case "CLEAR":
      return {
        model: { report: null },
        effects: [],
      };

    case "SET_REPORT":
      return {
        model: { report: msg.report },
        effects: [],
      };
  }
};
