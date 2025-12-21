// src/helpers/http-task.ts

import type { Reader as ReaderT } from "../adt/reader.js";
import { Reader } from "../adt/reader.js";

import type { Task as TaskT } from "../adt/task.js";
import { TaskModule as Task } from "../adt/task.js";

import type { Either } from "../adt/either.js";
import { left, right, isLeft } from "../adt/either.js";

/* ============================================================================
 * Types
 * ========================================================================== */

export type DefaultHttpError = {
  _tag: "DefaultHttpError";
  status: number | null;
  message: string;
  url: string;
  cause?: unknown;
};

export type HttpEnv = {
  baseUrl: string;
  fetch: typeof fetch;
};

/* ============================================================================
 * Helpers
 * ========================================================================== */

const makeError = (
  url: string,
  status: number | null,
  message: string,
  cause?: unknown
): DefaultHttpError => ({
  _tag: "DefaultHttpError",
  status,
  message,
  url,
  cause,
});

/* ============================================================================
 * httpTask
 * ========================================================================== */

/**
 * HTTP helper producing Reader<HttpEnv, Task<E | DefaultHttpError, A>>
 *
 * Semantics:
 * - Reader injects HttpEnv
 * - Task MAY fail
 * - Errors are DATA (not Msg)
 * - No dispatching here
 */
export const httpTask = <E = never, A = never>(
  path: string,
  decode?: (data: unknown) => Either<E, A>,
  mapError: (err: DefaultHttpError | E) => DefaultHttpError | E = (e) => e
): ReaderT<HttpEnv, TaskT<DefaultHttpError | E, A>> =>
  Reader((env: HttpEnv) => {
    const url = env.baseUrl + path;

    return Task.fromPromise<DefaultHttpError | E, A>(
      async () => {
        const res = await env.fetch(url);

        if (!res.ok) {
          throw makeError(
            url,
            res.status,
            `HTTP ${res.status} ${res.statusText}`
          );
        }

        let json: unknown;
        try {
          json = await res.json();
        } catch (e) {
          throw makeError(url, res.status, "Failed to parse JSON response", e);
        }

        if (!decode) {
          return json as A;
        }

        const decoded = decode(json);
        if (isLeft(decoded)) {
          throw decoded.left;
        }

        return decoded.right;
      },

      (err: unknown) => {
        if (err && (err as any)._tag === "DefaultHttpError") {
          return mapError(err as DefaultHttpError);
        }

        return mapError(
          makeError(
            url,
            null,
            err instanceof Error ? err.message : String(err),
            err
          )
        );
      }
    );
  });
