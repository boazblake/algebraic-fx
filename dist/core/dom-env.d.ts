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
 * Default browser environment constructor.
 */
export declare const browserEnv: () => DomEnv;
//# sourceMappingURL=dom-env.d.ts.map