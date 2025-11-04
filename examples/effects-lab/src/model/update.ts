import { Reader, Task, Either, Writer, IO, httpTask } from "effects-vdom";
import type { Model, Msg, Env } from "./types";

export const update = (msg: Msg, m: Model, dispatch: (msg: Msg) => void) => {
  switch (msg.type) {
    case "SET_ACTIVE":
      return { model: { ...m, active: msg.key } };

    case "FETCH_RESOURCE": {
      const key = msg.key;
      const readerTask = httpTask<any[]>(`/${key}`).run(m.env);

      const effect = IO(async () => {
        const result = await readerTask.run();
        if (result._tag === "Right")
          dispatch({ type: "FETCH_SUCCESS", key, data: result.right });
        else dispatch({ type: "FETCH_ERROR", key, error: result.left.message });
      });

      const logs = m.logs.chain(() =>
        Writer(() => ["", [`Fetching ${key}`]])
      );

      return {
        model: { ...m, [key]: { ...m[key], loading: true }, logs },
        effects: [effect],
      };
    }

    case "FETCH_SUCCESS": {
      const logs = m.logs.chain(() =>
        Writer(() => ["", [`Fetched ${msg.key}`]])
      );
      return {
        model: {
          ...m,
          [msg.key]: { data: msg.data, loading: false, error: undefined },
          logs,
        },
      };
    }

    case "FETCH_ERROR": {
      const logs = m.logs.chain(() =>
        Writer(() => ["", [`Error fetching ${msg.key}: ${msg.error}`]])
      );
      return {
        model: {
          ...m,
          [msg.key]: { ...m[msg.key], loading: false, error: msg.error },
          logs,
        },
      };
    }

    case "TOGGLE_THEME": {
      const next: "light" | "dark" = m.theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      return { model: { ...m, theme: next } };
    }

    default:
      return { model: m };
  }
};
