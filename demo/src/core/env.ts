import type { DomEnv } from "algebraic-fx";

export type AppEnv = DomEnv & {
  apiKey?: string;
  baseUrl?: string;
};

export const browserEnv = (): AppEnv => {
  return {
    document: window.document,
    window,
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    fetch: window.fetch.bind(window),

    apiKey:
      (import.meta as any).env?.VITE_ALPHA_VANTAGE_KEY ??
      "VITE_ALPHA_VANTAGE_KEY",
    baseUrl: "https://www.alphavantage.co",
  };
};
