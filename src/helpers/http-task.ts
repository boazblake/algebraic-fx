// src/helpers/http-task.ts

import type { Reader as ReaderT } from "../adt/reader.js";
import { Reader } from "../adt/reader.js";

import type { Task as TaskT } from "../adt/task.js";
import { TaskModule as Task } from "../adt/task.js";

import type { Either } from "../adt/either.js";
import { isLeft } from "../adt/either.js";

/**
 * Default structured HTTP error produced by httpTask.
 *
 * All errors are normalized into this shape so callers do not
 * need to handle heterogeneous error types.
 */
export type DefaultHttpError = {
  _tag: "DefaultHttpError";
  /** HTTP status code, or null if unavailable (network / decode error). */
  status: number | null;
  /** Human-readable error message. */
  message: string;
  /** Fully resolved request URL. */
  url: string;
  /** Optional underlying error (for debugging). */
  cause?: unknown;
};

/**
 * Environment required by httpTask.
 *
 * This is intentionally minimal and must be supplied by the application.
 */
export type HttpEnv = {
  /** Base URL prepended to all request paths. */
  baseUrl: string;
  /** Fetch implementation (usually window.fetch). */
  fetch: typeof fetch;
};

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

/**
 * Construct an HTTP Task wrapped in a Reader.
 *
 * IMPORTANT:
 * - httpTask DOES NOT dispatch messages.
 * - It returns Reader<Env, Task<E, A>>.
 * - The caller MUST map the Task result into Msg.
 *
 * @typeParam E Domain-specific decode error type
 * @typeParam A Decoded success value
 *
 * @param path Relative request path (appended to env.baseUrl)
 * @param decode Optional decoder transforming JSON into Either<E, A>
 * @param mapError Optional error mapper for DefaultHttpError or decode errors
 *
 * @returns Reader that produces a Task when run with HttpEnv
 *
 * @example
 * const fetchUsers =
 *   httpTask("/users", decodeUsers)
 *     .map(task =>
 *       task.map(users => ({ type: "UsersFetched", users }))
 *     );
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
