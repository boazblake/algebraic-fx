import type { Model } from "./model";

export type Msg = { type: "INC" } | { type: "DEC" } | { type: "RESET" };

export const update = (msg: Msg, model: Model) => {
  switch (msg.type) {
    case "INC": return { model: { count: model.count + 1 } , effects:[]};
    case "DEC": return { model: { count: model.count - 1 }, effects:[] };
    case "RESET": return { model: { count: 0 }, effects:[] };
    default: return { model, effects:[] };
  }
};
