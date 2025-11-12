import { Reader } from "../adt/reader.js";
import { IO } from "../adt/io.js";
export const askEnv = Reader((env) => env);
export const askDocument = askEnv.map((e) => e.document);
export const askWindow = askEnv.map((e) => e.window);
export const askLocal = askEnv.map((e) => e.localStorage);
export const askSession = askEnv.map((e) => e.sessionStorage);
export const askFetch = askEnv.map((e) => e.fetch);
export const select = (selector) => askDocument.map((doc) => doc.querySelector(selector));
const withElement = (selector, f) => askDocument.map((doc) => IO(() => {
    const el = doc.querySelector(selector);
    return f(el);
}));
export const writeHtml = (selector, html) => withElement(selector, (el) => {
    if (el)
        el.innerHTML = html;
    return el;
});
export const appendHtml = (selector, html) => withElement(selector, (el) => {
    if (el)
        el.insertAdjacentHTML("beforeend", html);
    return el;
});
export const writeText = (selector, text) => withElement(selector, (el) => {
    if (el)
        el.textContent = text;
    return el;
});
export const getElement = (selector) => askDocument.map((doc) => doc.querySelector(selector));
export const writeToElement = (selector, html) => askDocument.map((doc) => IO(() => {
    const el = doc.querySelector(selector);
    if (el)
        el.innerHTML = html;
    return el;
}));
export const appendToElement = (selector, html) => askDocument.map((doc) => IO(() => {
    const el = doc.querySelector(selector);
    if (el)
        el.insertAdjacentHTML("beforeend", html);
    return el;
}));
export const alertIO = (msg) => askWindow.map((win) => IO(() => win.alert(msg)));
export const scrollToIO = (x, y) => askWindow.map((win) => IO(() => win.scrollTo(x, y)));
export const localSet = (key, val) => askLocal.map((s) => IO(() => s.setItem(key, val)));
export const localGet = (key) => askLocal.map((s) => IO(() => s.getItem(key)));
export const sessionSet = (key, val) => askSession.map((s) => IO(() => s.setItem(key, val)));
export const sessionGet = (key) => askSession.map((s) => IO(() => s.getItem(key)));
export const fetchIO = (url, options) => askFetch.map((fetchFn) => IO(async () => fetchFn(url, options)));
export const runDomIO = (rio, env) => rio.run(env).run();
export const browserEnv = () => ({
    document,
    window,
    localStorage,
    sessionStorage,
    fetch,
});
