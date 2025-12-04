import { Reader } from "../adt/reader.js";
import { Task } from "../adt/task.js";
import { Either } from "../adt/either.js";

export type HttpEnv = {
  fetch: typeof fetch;
  baseUrl?: string;
};

export type DefaultHttpError = {
  status: number;
  message: string;
};

/**
 * Helper to consume a Task and call a handler.
 * Useful to turn a Task into an IO<void> in userland.
 */
export const runTask =
  <E, A>(task: Task<E, A>, f: (either: Either<E, A>) => void) =>
  (): Promise<void> =>
    task.run().then(f);

/**
 * Overload 1: default error type
 */
export function httpTask<A = unknown>(
  path: string,
  options?: RequestInit
): Reader<HttpEnv, Task<DefaultHttpError, A>>;

/**
 * Overload 2: custom error mapping
 */
export function httpTask<E, A>(
  path: string,
  options: RequestInit | undefined,
  handleError: (e: DefaultHttpError | unknown) => E
): Reader<HttpEnv, Task<E, A>>;

/**
 * Implementation
 */
export function httpTask<E, A>(
  path: string,
  options?: RequestInit,
  handleError?: (e: DefaultHttpError | unknown) => E
): Reader<HttpEnv, Task<DefaultHttpError | E, A>> {
  return Reader((env: HttpEnv) =>
    Task<DefaultHttpError | E, A>(async () => {
      const toDefaultError = (
        status: number,
        message: string
      ): DefaultHttpError => ({ status, message });

      const mapError = (e: DefaultHttpError | unknown): DefaultHttpError | E =>
        handleError ? handleError(e) : (e as DefaultHttpError);

      try {
        const base = env.baseUrl ?? "";
        const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        const url = `${normalizedBase}${normalizedPath}`;

        const res = await env.fetch(url, options);

        if (!res.ok) {
          const baseErr = toDefaultError(
            res.status,
            res.statusText || "HTTP error"
          );
          return Either.Left<DefaultHttpError | E>(mapError(baseErr));
        }

        try {
          const data = (await res.json()) as A;
          return Either.Right<A>(data);
        } catch {
          const baseErr = toDefaultError(res.status, "Invalid JSON");
          return Either.Left<DefaultHttpError | E>(mapError(baseErr));
        }
      } catch (e: any) {
        const baseErr = toDefaultError(
          0,
          e instanceof Error ? e.message : String(e)
        );
        return Either.Left<DefaultHttpError | E>(mapError(baseErr));
      }
    })
  );
}
