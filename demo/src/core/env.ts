// src/core/env.ts
import type { DomEnv } from "algebraic-fx";

export type AppEnv = DomEnv & {
  apiBase: string;
};

export const browserEnv = (): AppEnv => {
  return {
    doc: window.document,
    window,
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    fetch: window.fetch.bind(window),

    apiBase: "https://jsonplaceholder.typicode.com/",
  };
};
