import { IO } from "algebraic-fx";
import type { Model, Msg } from "./types";
import type { Dispatch, RawEffect } from "algebraic-fx";

export const update = (
  msg: Msg,
  m: Model,
  _dispatch: Dispatch<Msg>
): { model: Model; effects: RawEffect<any>[] } => {
  switch (msg.type) {
    case "ADD_ENTRY":
      return {
        model: { ...m, entries: [msg.entry, ...m.entries] },
        effects: [],
      };

    case "CLEAR":
      return {
        model: { ...m, entries: [] },
        effects: [],
      };

    case "EXPORT_JSON": {
      const data = JSON.stringify(m.entries, null, 2);
      const effect = IO(() => {
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `fp-rebalance-audit-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
      return { model: m, effects: [effect] };
    }

    default:
      return { model: m, effects: [] };
  }
};
