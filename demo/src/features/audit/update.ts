import type { RawEffect } from "algebraic-fx";
import type { AppEnv } from "../../core/env";
import type { AuditModel, AuditMsg } from "./types";

type FX = RawEffect<AppEnv>[];

export const update = (
  msg: AuditMsg,
  model: AuditModel
): { model: AuditModel; effects: FX } => {
  switch (msg.type) {
    case "Append": {
      const entry = { ...msg.entry, id: model.nextId };
      return {
        model: {
          nextId: model.nextId + 1,
          entries: [entry, ...model.entries],
        },
        effects: [],
      };
    }

    case "Clear": {
      return {
        model: { ...model, entries: [] },
        effects: [],
      };
    }
  }
};
