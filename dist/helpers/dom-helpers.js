import { IO } from "../adt/io.js";
import { Reader } from "../adt/reader.js";
/**
 * DOM helper effects built with Reader<DomEnv, IO<void>>.
 *
 * These helpers:
 *  - perform DOM mutations
 *  - return Reader<DomEnv, IO<void>>
 *  - are executed by renderApp when returned in effects[]
 *
 * They are optional convenience utilities for browser apps.
 */
const askEnv = Reader((env) => env);
const askDocument = askEnv.map((e) => e.document);
const askWindow = askEnv.map((e) => e.window);
const askLocal = askEnv.map((e) => e.localStorage);
const askSession = askEnv.map((e) => e.sessionStorage);
const askFetch = askEnv.map((e) => e.fetch);
/* INTERNAL ELEMENT ACCESSOR */
const withElement = (selector, f) => askDocument.map((doc) => IO(() => {
    const el = doc.querySelector(selector);
    return f(el);
}));
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
export const writeToElement = (selector, html) => withElement(selector, (el) => {
    if (el)
        el.innerHTML = html;
    return el;
});
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
export const appendToElement = (selector, html) => withElement(selector, (el) => {
    if (el)
        el.insertAdjacentHTML("beforeend", html);
    return el;
});
/**
 * Set `textContent` on the selected element.
 *
 * @param selector CSS selector of the target element.
 * @param text Text content to apply.
 *
 * @example
 * runDomIO(writeText("#status", "Ready"), env);
 */
export const writeText = (selector, text) => withElement(selector, (el) => {
    if (el)
        el.textContent = text;
    return el;
});
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
export const alertIO = (msg) => askWindow.map((win) => IO(() => win.alert(msg)));
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
export const scrollToIO = (x, y) => askWindow.map((win) => IO(() => win.scrollTo(x, y)));
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
export const localSet = (key, val) => askLocal.map((storage) => IO(() => {
    try {
        storage.setItem(key, val);
    }
    catch (e) {
        console.error("[localSet] storage error:", e);
    }
}));
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
export const localGet = (key) => askLocal.map((storage) => IO(() => {
    try {
        return storage.getItem(key);
    }
    catch (e) {
        console.error("[localGet] storage error:", e);
        return null;
    }
}));
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
export const sessionSet = (key, val) => askSession.map((storage) => IO(() => {
    try {
        storage.setItem(key, val);
    }
    catch (e) {
        console.error("[sessionSet] storage error:", e);
    }
}));
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
export const sessionGet = (key) => askSession.map((storage) => IO(() => {
    try {
        return storage.getItem(key);
    }
    catch (e) {
        console.error("[sessionGet] storage error:", e);
        return null;
    }
}));
/* FETCH HELPER */
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
export const fetchIO = (url, options) => askFetch.map((fetchFn) => IO(() => fetchFn(url, options)));
/* RUNNER */
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
export const runDomIO = (rio, env) => rio.run(env).run();
//# sourceMappingURL=dom-helpers.js.map