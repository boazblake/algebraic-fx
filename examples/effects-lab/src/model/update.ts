import { Reader, IO, Writer, httpTask, Either } from "effects-vdom";
import type { Model, Msg, Env, EnvResources } from "./types";

/** Create an IO that fetches a resource and dispatches results */
const fetchResource = <A>(
  key: keyof EnvResources,
  page: number,
  limit: number,
  env: Env,
  dispatch: (msg: Msg) => void
): IO<Promise<void>> => {
  const task = httpTask<{ status: number; message: string }, A[]>(
    `/${key}?_page=${page}&_limit=${limit}`
  ).run(env);

  // Wrap the Task inside an IO
  return IO(async () => {
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
};

export const update = (msg: Msg, m: Model, dispatch: (msg: Msg) => void) => {
  switch (msg.type) {
    case "SET_ACTIVE":
      return { model: { ...m, active: msg.key }, effects: [] };

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
        effects: [],
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
        effects: [],
      };
    }

    case "TOGGLE_THEME": {
      const next: "light" | "dark" = m.theme === "light" ? "dark" : "light";
      const effect = IO(() =>
        document.documentElement.classList.toggle("dark", next === "dark")
      );

      return { model: { ...m, theme: next }, effects: [effect] };
    }

    default:
      return { model: m, effects: [] };
  }
};
