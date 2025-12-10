import type { DomEnv } from "algebraic-fx";

export type AppEnv = DomEnv & {
  apiKey: string;
  apiBase: string;
};

export const env: AppEnv = {
  document,
  window,
  apiKey: "DEMO_KEY",
  apiBase: "https://www.alphavantage.co",
};
