import { Reader } from "../adt/reader.js";
/* ENV READERS */
export const askEnv = Reader((env) => env);
export const askDocument = askEnv.map((env) => env.document);
export const askWindow = askEnv.map((env) => env.window);
export const askLocal = askEnv.map((env) => env.localStorage);
export const askSession = askEnv.map((env) => env.sessionStorage);
export const askFetch = askEnv.map((env) => env.fetch);
/**
 * Construct a DomEnv from global browser objects.
 *
 * Throws if called in a non-browser (SSR/Node) environment.
 */
export const browserEnv = () => {
    if (typeof window === "undefined" || typeof document === "undefined") {
        throw new Error("browserEnv() called in a non-browser environment. " +
            "Use a custom DomEnv implementation when running SSR or tests.");
    }
    return {
        document: window.document,
        window,
        localStorage: window.localStorage,
        sessionStorage: window.sessionStorage,
        fetch: window.fetch.bind(window),
    };
};
//# sourceMappingURL=dom-env.js.map