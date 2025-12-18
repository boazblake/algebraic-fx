// src/app/init.ts
import { IO } from "algebraic-fx/adt/io";
import type { Model } from "./types";
console.log(
  IO(() => {
    const model: Model = {
      count: 0,
      message: null,
    };
    return { model, effects: [] };
  })
);
export const init = IO(() => {
  const model: Model = {
    count: 0,
    message: null,
  };
  return { model, effects: [] };
});
