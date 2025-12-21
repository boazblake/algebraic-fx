// src/helpers/http-task.ts

import type { Reader as ReaderT } from "../adt/reader.js";
import { ReaderModule as Reader } from "../adt/reader.js";

import type { Task as TaskT } from "../adt/task.js";
import { TaskModule as Task } from "../adt/task.js";

/* ============================================================================
 * Types
 * ========================================================================== */

export type HttpEnv = {
  baseUrl: string;
  fetch: typeof fetch;
};

export type HttpError = {
  _tag: "HttpError";
  status: number | null;
  message: string;
  url: string;
  cause?: unknown;
};

/* ============================================================================
 * httpTask
 * ========================================================================== */

/**
 * HTTP effect that ALWAYS resolves to a Msg.
 *
 * - Reader injects HttpEnv
 * - Task NEVER fails (E = never)
 * - All failures are mapped into Msg in the Promise itself
 */
export const httpTask = <Msg>(
  path: string,
  onSuccess: (data: unknown) => Msg,
  onError: (err: HttpError) => Msg
): ReaderT<HttpEnv, TaskT<never, Msg>> =>
  Reader.of(
    Task.fromPromise<never, Msg>(
      () => fetchPromise(path, onSuccess, onError),
      unreachable
    )
  );

/* ============================================================================
 * Internal helpers
 * ========================================================================== */

const unreachable = (_: unknown): never => {
  throw new Error("Unreachable: Task<never, Msg> rejected");
};

const fetchPromise = async <Msg>(
  path: string,
  onSuccess: (data: unknown) => Msg,
  onError: (err: HttpError) => Msg
): Promise<Msg> => {
  const url = path;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      return onError({
        _tag: "HttpError",
        status: res.status,
        message: `HTTP ${res.status} ${res.statusText}`,
        url,
      });
    }

    let json: unknown;
    try {
      json = await res.json();
    } catch (e) {
      return onError({
        _tag: "HttpError",
        status: res.status,
        message: "Failed to parse JSON response",
        url,
        cause: e,
      });
    }

    return onSuccess(json);
  } catch (e) {
    return onError({
      _tag: "HttpError",
      status: null,
      message: e instanceof Error ? e.message : String(e),
      url,
      cause: e,
    });
  }
};
