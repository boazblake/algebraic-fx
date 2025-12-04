import { IO } from "../adt/io.js";
import { Reader } from "../adt/reader.js";
/* ENV READERS */
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
/* DOM WRITE HELPERS */
export const writeToElement = (selector, html) => withElement(selector, (el) => {
    if (el)
        el.innerHTML = html;
    return el;
});
export const appendToElement = (selector, html) => withElement(selector, (el) => {
    if (el)
        el.insertAdjacentHTML("beforeend", html);
    return el;
});
export const writeText = (selector, text) => withElement(selector, (el) => {
    if (el)
        el.textContent = text;
    return el;
});
/* WINDOW HELPERS */
export const alertIO = (msg) => askWindow.map((win) => IO(() => win.alert(msg)));
export const scrollToIO = (x, y) => askWindow.map((win) => IO(() => win.scrollTo(x, y)));
/* STORAGE HELPERS */
export const localSet = (key, val) => askLocal.map((storage) => IO(() => {
    try {
        storage.setItem(key, val);
    }
    catch (e) {
        console.error("[localSet] storage error:", e);
    }
}));
export const localGet = (key) => askLocal.map((storage) => IO(() => {
    try {
        return storage.getItem(key);
    }
    catch (e) {
        console.error("[localGet] storage error:", e);
        return null;
    }
}));
export const sessionSet = (key, val) => askSession.map((storage) => IO(() => {
    try {
        storage.setItem(key, val);
    }
    catch (e) {
        console.error("[sessionSet] storage error:", e);
    }
}));
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
export const fetchIO = (url, options) => askFetch.map((fetchFn) => IO(() => fetchFn(url, options)));
/* RUNNER */
export const runDomIO = (rio, env) => rio.run(env).run();
//# sourceMappingURL=dom-helpers.js.map