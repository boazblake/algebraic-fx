// src/app/update.ts
import type { Model, Msg } from "./types";
import type { Dispatch, RawEffect } from "algebraic-fx";
import { fetchMessage } from "../effects/api";
import type { AppEnv } from "../core/env";
import { Reader } from "algebraic-fx/adt/reader";
import { IO } from "algebraic-fx/adt/io";
import { isRight, right } from "algebraic-fx/adt/either";

export const update = (
  msg: Msg,
  m: Model,
  dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<AppEnv>[] } => {
  switch (msg.type) {
    case "INC":
      return {
        model: { ...m, count: m.count + 1 },
        effects: [],
      };

    case "DEC":
      return {
        model: { ...m, count: m.count - 1 },
        effects: [],
      };

    case "LOAD": {
      const fx = fetchMessage.map((task) =>
        IO(() => {
          task.run().then((result) => {
            console.log("wtf", result);
            if (isRight(result)) {
              dispatch({
                type: "LOADED",
                result,
              });
            } else {
              dispatch({ type: "LOAD_ERROR" });
            }
          });
        })
      );

      return {
        model: { ...m, message: null },
        effects: [fx],
      };
    }

    case "LOADED":
      return {
        model: { ...m, message: msg.result },
        effects: [],
      };

    case "LOAD_ERROR":
      return {
        model: { ...m, message: "Failed to load message." },
        effects: [],
      };

    default:
      return { model: m, effects: [] };
  }
};
