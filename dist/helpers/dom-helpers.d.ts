import { IO } from "../adt/io.js";
import { Reader } from "../adt/reader.js";
import type { DomEnv } from "../core/dom-env.js";
/**
 * Replace the innerHTML of the element matched by the CSS selector.
 *
 * This returns a `Reader<DomEnv, IO<HTMLElement | null>>`:
 * - When executed inside the environment, it locates the element,
 * - Sets `innerHTML`,
 * - Returns the element or null if not found.
 *
 * @param selector CSS selector to find the element.
 * @param html HTML string to insert.
 *
 * @example
 * runDomIO(writeToElement("#title", "<h1>Hello</h1>"), env);
 */
export declare const writeToElement: (selector: string, html: string) => Reader<DomEnv, IO<HTMLElement | null>>;
/**
 * Append HTML to the selected element using `insertAdjacentHTML("beforeend")`.
 *
 * Useful for declarative DOM updates through the effect system.
 *
 * @param selector CSS selector to find the element.
 * @param html HTML string to append.
 *
 * @example
 * runDomIO(appendToElement("#list", "<li>Item</li>"), env);
 */
export declare const appendToElement: (selector: string, html: string) => Reader<DomEnv, IO<HTMLElement | null>>;
/**
 * Set `textContent` on the selected element.
 *
 * @param selector CSS selector of the target element.
 * @param text Text content to apply.
 *
 * @example
 * runDomIO(writeText("#status", "Ready"), env);
 */
export declare const writeText: (selector: string, text: string) => Reader<DomEnv, IO<HTMLElement | null>>;
/**
 * Display a browser alert dialog.
 *
 * Returned effect runs `window.alert(message)` when executed.
 *
 * @param msg Message to display.
 *
 * @example
 * runDomIO(alertIO("Hello!"), env);
 */
export declare const alertIO: (msg: string) => Reader<DomEnv, IO<void>>;
/**
 * Scroll the window to a given (x, y) offset.
 *
 * Returned effect calls `window.scrollTo(x, y)` when executed.
 *
 * @param x Horizontal scroll offset.
 * @param y Vertical scroll offset.
 *
 * @example
 * runDomIO(scrollToIO(0, 0), env);
 */
export declare const scrollToIO: (x: number, y: number) => Reader<DomEnv, IO<void>>;
/**
 * Write a value to `localStorage`.
 *
 * Errors such as quota exceeded or disabled storage are logged, not thrown.
 *
 * @param key Storage key.
 * @param val Value to store.
 *
 * @example
 * runDomIO(localSet("theme", "dark"), env);
 */
export declare const localSet: (key: string, val: string) => Reader<DomEnv, IO<void>>;
/**
 * Read a value from `localStorage`.
 *
 * Returns an IO action that:
 * - returns `string | null`
 * - logs errors (e.g. private browsing restrictions)
 *
 * @param key Storage key.
 *
 * @example
 * const stored = runDomIO(localGet("theme"), env).run();
 */
export declare const localGet: (key: string) => Reader<DomEnv, IO<string | null>>;
/**
 * Write a value to `sessionStorage`.
 *
 * Errors are logged and ignored.
 *
 * @param key Storage key.
 * @param val Value to store.
 *
 * @example
 * runDomIO(sessionSet("token", "abc123"), env);
 */
export declare const sessionSet: (key: string, val: string) => Reader<DomEnv, IO<void>>;
/**
 * Read a value from `sessionStorage`.
 *
 * Returns `IO<string | null>`, logging any access errors.
 *
 * @param key Storage key.
 *
 * @example
 * const token = runDomIO(sessionGet("token"), env).run();
 */
export declare const sessionGet: (key: string) => Reader<DomEnv, IO<string | null>>;
/**
 * Perform a fetch call inside the DomEnv context.
 *
 * This is a lightweight effect wrapper for DOM fetch, returning:
 *   Reader<DomEnv, IO<Promise<Response>>>
 *
 * For advanced control, prefer httpTask + Task for:
 * - typed errors
 * - retries
 * - cancellation
 *
 * @param url URL to fetch.
 * @param options Fetch init options.
 *
 * @example
 * const effect = fetchIO("/api/users");
 * runDomIO(effect, env).run().then(r => r.json());
 */
export declare const fetchIO: (url: string, options?: RequestInit) => Reader<DomEnv, IO<Promise<Response>>>;
/**
 * Execute a `Reader<DomEnv, IO<A>>` inside a concrete `DomEnv`.
 *
 * Equivalent to:
 *   reader.run(env).run()
 *
 * This helper is convenient for using DOM effects outside of Programs,
 * or for imperative code in development.
 *
 * @param rio A Reader<DomEnv, IO<A>> effect.
 * @param env The DomEnv used to resolve DOM operations.
 * @returns The result of executing the IO.
 *
 * @example
 * runDomIO(writeToElement("#root", "<p>Hello</p>"), env);
 */
export declare const runDomIO: <A>(rio: {
    run: (env: DomEnv) => {
        run: () => A;
    };
}, env: DomEnv) => A;
//# sourceMappingURL=dom-helpers.d.ts.map