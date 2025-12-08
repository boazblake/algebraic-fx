// src/core/env.ts
import type { DomEnv, HttpEnv } from "algebraic-fx";

/**
 * Application environment for fp-rebalance.
 *
 * This is what your Readers and RawEffects see.
 * It does NOT expose TaskController or SubscriptionController –
 * those are internal to algebraic-fx runtime.
 */
export type AppEnv = DomEnv & {
  apiKey: string;
  http: HttpEnv;
  baseUrl: string;
};

/**
 * Build the browser environment.
 */
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

    http: {
      fetch: window.fetch.bind(window),
      baseUrl: "https://www.alphavantage.co",
    },
  };
};
