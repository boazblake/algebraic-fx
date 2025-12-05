import type { Model, Msg } from "./types";
import type { Dispatch, RawEffect } from "algebraic-fx";

export const update = (
  msg: Msg,
  m: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<any>[] } => {
  switch (msg.type) {
    case "SET_REPORT":
      return {
        model: { ...m, report: msg.report },
        effects: [],
      };

    case "CLEAR":
      return {
        model: { ...m, report: null },
        effects: [],
      };

    default:
      return { model: m, effects: [] };
  }
};
