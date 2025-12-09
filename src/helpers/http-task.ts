/**
 * @module helpers/http-task
 *
 * Pure HTTP helper using Reader<HttpEnv, Task<E,A>>.
 *
 * This helper:
 *   - does not depend on Program or Effect
 *   - returns Task<E,A> for algebraic composition
 *   - respects AbortSignal provided by Task.run(signal?)
 *
 * Integrate with algebraic-fx by wrapping Task in an Effect<Env,Msg>.
 */

import { Reader } from "../adt/reader.js";
import { Task } from "../adt/task.js";
import { Left, Right } from "../adt/either.js";

/**
 * Environment required by httpTask.
 */
export type HttpEnv = {
  fetch: typeof fetch;
  baseUrl?: string;
};

/**
 * Default error shape for HTTP failures.
 */
export type DefaultHttpError = {
  status: number;
  message: string;
};

export function httpTask<A = unknown>(
  path: string,
  options?: RequestInit
): Reader<HttpEnv, Task<DefaultHttpError, A>>;

export function httpTask<E, A>(
  path: string,
  options: RequestInit | undefined,
  handleError: (e: DefaultHttpError | unknown) => E
): Reader<HttpEnv, Task<E, A>>;

/**
 * Construct a Reader<HttpEnv, Task<E,A>> that performs a JSON HTTP request.
 *
 * @param path        URL path (resolved against HttpEnv.baseUrl if present)
 * @param options     fetch options
 * @param handleError optional mapper from DefaultHttpError | unknown to user E
 */
export function httpTask<E, A>(
  path: string,
  options?: RequestInit,
  handleError?: (e: DefaultHttpError | unknown) => E
): Reader<HttpEnv, Task<DefaultHttpError | E, A>> {
  return Reader((env: HttpEnv) =>
    Task<DefaultHttpError | E, A>(
      async (
        signal?: AbortSignal
      ): Promise<Either<DefaultHttpError | E, A>> => {
        const toDefaultError = (
          status: number,
          message: string
        ): DefaultHttpError => ({ status, message });

        const mapError = (
          e: DefaultHttpError | unknown
        ): DefaultHttpError | E =>
          handleError ? handleError(e) : (e as DefaultHttpError);

        const base = env.baseUrl ?? "";

        const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        const url = base ? normalizedBase + normalizedPath : path;

        try {
          const res = await env.fetch(url, { ...options, signal });

          if (!res.ok) {
            const baseErr = toDefaultError(
              res.status,
              res.statusText || "HTTP error"
            );
            return Left(mapError(baseErr));
          }

          try {
            const data = (await res.json()) as A;
            return Right(data);
          } catch {
            const baseErr = toDefaultError(res.status, "Invalid JSON");
            return Left(mapError(baseErr));
          }
        } catch (e: any) {
          const baseErr = toDefaultError(
            0,
            e instanceof Error ? e.message : String(e)
          );
          return Left(mapError(baseErr));
        }
      }
    )
  );
}
