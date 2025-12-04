import { Reader } from "../adt/reader.js";

/**
 * Browser DOM environment definition.
 * Core uses this only for environment injection.
 */
export type DomEnv = {
  document: Document;
  window: Window;
  localStorage: Storage;
  sessionStorage: Storage;
  fetch: typeof fetch;
};

/**
 * Extended environment for WS-based modules.
 */
export type NetEnv = DomEnv & { ws: WebSocket };

/* ENV READERS */

export const askEnv = Reader<DomEnv, DomEnv>((env) => env);

export const askDocument = askEnv.map((env) => env.document);
export const askWindow = askEnv.map((env) => env.window);
export const askLocal = askEnv.map((env) => env.localStorage);
export const askSession = askEnv.map((env) => env.sessionStorage);
export const askFetch = askEnv.map((env) => env.fetch);

/**
 * Default browser environment constructor.
 */
export const browserEnv = (): DomEnv => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error(
      "browserEnv() called in a non-browser environment. " +
        "Use a custom DomEnv implementation when running SSR or tests."
    );
  }

  return {
    document: window.document,
    window,
    localStorage: window.localStorage,
    sessionStorage: window.sessionStorage,
    fetch: window.fetch.bind(window),
  };
};
