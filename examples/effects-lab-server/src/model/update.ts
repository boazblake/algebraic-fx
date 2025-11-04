import {
  Reader,
  Task,
  Either,
  Writer,
  IO,
} from "../../node_modules/effects-vdom/dist/adt/index.js";
import { httpTask } from "../../node_modules/effects-vdom/dist/core/index.js";
import type { Model, Msg, Env, EnvResources } from "./types.js";

/** IO-based fetch that runs safely on server or client */
const fetchResource = <A>(
  key: keyof EnvResources,
  page: number,
  limit: number,
  env: Env,
  dispatch: (msg: Msg) => void
): IO<Promise<void>> =>
  IO(async () => {
    const task = httpTask<{ status: number; message: string }, A[]>(
      `/${key}?_page=${page}&_limit=${limit}`
    ).run(env);

    const either = await task.run();
    if (Either.isRight(either)) {
      dispatch({
        type: "FETCH_SUCCESS",
        key,
        data: either.right,
        page,
      });
    } else {
      const err = either.left;
      dispatch({
        type: "FETCH_ERROR",
        key,
        error:
          typeof err === "string"
            ? { status: 0, message: err }
            : err || { status: 0, message: "Unknown error" },
      });
    }
  });

/** Server-compatible update — no direct DOM access */
export const update = (msg: Msg, m: Model, dispatch: (msg: Msg) => void) => {
  switch (msg.type) {
    case "SET_ACTIVE":
      return { model: { ...m, active: msg.key } };

    case "FETCH_RESOURCE": {
      const key = msg.key;
      const { limit } = m[key];
      const effect = fetchResource<any>(key, 1, limit, m.env, dispatch);
      return {
        model: { ...m, [key]: { ...m[key], loading: true } },
        effects: [effect],
      };
    }

    case "FETCH_PAGE": {
      const key = msg.key;
      const { limit } = m[key];
      const effect = fetchResource<any>(key, msg.page, limit, m.env, dispatch);
      return {
        model: { ...m, [key]: { ...m[key], loading: true } },
        effects: [effect],
      };
    }

    case "FETCH_SUCCESS": {
      const key = msg.key;
      const logs = m.logs.chain(() =>
        Writer(() => ["", [`Fetched ${key} page ${msg.page || 1}`]])
      );
      return {
        model: {
          ...m,
          [key]: {
            ...m[key],
            data: msg.data,
            loading: false,
            page: msg.page || 1,
          },
          logs,
        },
      };
    }

    case "FETCH_ERROR": {
      const key = msg.key;
      const logs = m.logs.chain(() =>
        Writer(() => [
          "",
          [
            `Error fetching ${key}: ${
              typeof msg.error === "string"
                ? msg.error
                : JSON.stringify(msg.error)
            }`,
          ],
        ])
      );
      return {
        model: {
          ...m,
          [key]: { ...m[key], loading: false, error: msg.error },
          logs,
        },
      };
    }

    // SSR-safe theme toggle: no direct DOM mutation
    case "TOGGLE_THEME": {
      const next: "light" | "dark" = m.theme === "light" ? "dark" : "light";
      const effect = IO(() => {
        // Server-safe: check existence
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("dark", next === "dark");
        }
      });
      return { model: { ...m, theme: next }, effects: [effect] };
    }

    default:
      return { model: m };
  }
};
