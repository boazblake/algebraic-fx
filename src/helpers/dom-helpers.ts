import { IO } from "../adt/io.js";
import { Reader } from "../adt/reader.js";
import type { DomEnv } from "../core/dom-env.js";

/* ENV READERS */

const askEnv = Reader<DomEnv, DomEnv>((env) => env);
const askDocument = askEnv.map((e) => e.document);
const askWindow = askEnv.map((e) => e.window);
const askLocal = askEnv.map((e) => e.localStorage);
const askSession = askEnv.map((e) => e.sessionStorage);
const askFetch = askEnv.map((e) => e.fetch);

/* INTERNAL ELEMENT ACCESSOR */

const withElement = <A>(selector: string, f: (el: HTMLElement | null) => A) =>
  askDocument.map((doc) =>
    IO(() => {
      const el = doc.querySelector<HTMLElement>(selector);
      return f(el);
    })
  );

/* DOM WRITE HELPERS */

export const writeToElement = (selector: string, html: string) =>
  withElement(selector, (el) => {
    if (el) el.innerHTML = html;
    return el;
  });

export const appendToElement = (selector: string, html: string) =>
  withElement(selector, (el) => {
    if (el) el.insertAdjacentHTML("beforeend", html);
    return el;
  });

export const writeText = (selector: string, text: string) =>
  withElement(selector, (el) => {
    if (el) el.textContent = text;
    return el;
  });

/* WINDOW HELPERS */

export const alertIO = (msg: string) =>
  askWindow.map((win) => IO(() => win.alert(msg)));

export const scrollToIO = (x: number, y: number) =>
  askWindow.map((win) => IO(() => win.scrollTo(x, y)));

/* STORAGE HELPERS */

export const localSet = (key: string, val: string) =>
  askLocal.map((storage) =>
    IO(() => {
      try {
        storage.setItem(key, val);
      } catch (_) {}
    })
  );

export const localGet = (key: string) =>
  askLocal.map((storage) =>
    IO(() => {
      try {
        return storage.getItem(key);
      } catch (_) {
        return null;
      }
    })
  );

export const sessionSet = (key: string, val: string) =>
  askSession.map((storage) =>
    IO(() => {
      try {
        storage.setItem(key, val);
      } catch (_) {}
    })
  );

export const sessionGet = (key: string) =>
  askSession.map((storage) =>
    IO(() => {
      try {
        return storage.getItem(key);
      } catch (_) {
        return null;
      }
    })
  );

/* FETCH HELPER */

export const fetchIO = (url: string, options?: RequestInit) =>
  askFetch.map((fetchFn) => IO(() => fetchFn(url, options)));

/* RUNNER */

export const runDomIO = <A>(
  rio: { run: (env: DomEnv) => { run: () => A } },
  env: DomEnv
): A => rio.run(env).run();
