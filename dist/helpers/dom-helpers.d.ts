import { IO } from "../adt/io.js";
import { Reader } from "../adt/reader.js";
import type { DomEnv } from "../core/dom-env.js";
export declare const writeToElement: (selector: string, html: string) => Reader<DomEnv, IO<HTMLElement | null>>;
export declare const appendToElement: (selector: string, html: string) => Reader<DomEnv, IO<HTMLElement | null>>;
export declare const writeText: (selector: string, text: string) => Reader<DomEnv, IO<HTMLElement | null>>;
export declare const alertIO: (msg: string) => Reader<DomEnv, IO<void>>;
export declare const scrollToIO: (x: number, y: number) => Reader<DomEnv, IO<void>>;
export declare const localSet: (key: string, val: string) => Reader<DomEnv, IO<void>>;
export declare const localGet: (key: string) => Reader<DomEnv, IO<string | null>>;
export declare const sessionSet: (key: string, val: string) => Reader<DomEnv, IO<void>>;
export declare const sessionGet: (key: string) => Reader<DomEnv, IO<string | null>>;
export declare const fetchIO: (url: string, options?: RequestInit) => Reader<DomEnv, IO<Promise<Response>>>;
export declare const runDomIO: <A>(rio: {
    run: (env: DomEnv) => {
        run: () => A;
    };
}, env: DomEnv) => A;
//# sourceMappingURL=dom-helpers.d.ts.map