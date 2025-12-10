import type { DomEnv } from "algebraic-fx";

export type AppEnv = DomEnv;

export const env: AppEnv = {
  document,
  window,
};
