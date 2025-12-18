// src/effects/api.ts
import { Reader } from "algebraic-fx/adt/reader";
import { TaskModule as Task } from "algebraic-fx/adt/task";
import { left, right } from "algebraic-fx/adt/either";
import type { AppEnv } from "../core/env";

export type ApiError = { _tag: "HttpError"; status: number };
export const fetchMessage = Reader<AppEnv, Task<ApiError, string>>((env) =>
  Task.of<ApiError, string>((signal) =>
    env
      .fetch(env.apiBase + "/todos", { signal })
      .then((res) => {
        if (!res.ok) {
          return left<ApiError>({
            _tag: "HttpError",
            status: res.status,
          });
        }
        return res.text().then((txt) => right(txt));
      })
      .catch(() =>
        left<ApiError>({
          _tag: "HttpError",
          status: 0,
        })
      )
  )
);
