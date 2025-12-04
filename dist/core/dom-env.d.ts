import { Reader } from "../adt/reader.js";
/**
 * DOM environment abstraction for algebraic-fx.
 *
 * DomEnv is passed to Reader<E,IO<void>> effects to provide:
 *  - document
 *  - window
 *  - localStorage
 *  - sessionStorage
 *  - fetch
 *
 * This enables pure programs to run effects that depend on DOM or browser API.
 */
/**
 * Environment contract for DOM-based applications.
 *
 * All fields are provided by `browserEnv()`, which throws in SSR.
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
export type NetEnv = DomEnv & {
    ws: WebSocket;
};
export declare const askEnv: Reader<DomEnv, DomEnv>;
export declare const askDocument: Reader<DomEnv, Document>;
export declare const askWindow: Reader<DomEnv, Window>;
export declare const askLocal: Reader<DomEnv, Storage>;
export declare const askSession: Reader<DomEnv, Storage>;
export declare const askFetch: Reader<DomEnv, typeof fetch>;
/**
 * Construct a DomEnv from global browser objects.
 *
 * Throws if called in a non-browser (SSR/Node) environment.
 */
export declare const browserEnv: () => DomEnv;
//# sourceMappingURL=dom-env.d.ts.map