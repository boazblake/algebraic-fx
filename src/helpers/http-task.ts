import { Reader } from "../adt/reader.js";
import { Task } from "../adt/task.js";
import { Either, Left, Right } from "../adt/either.js";

export type HttpEnv = {
  fetch: typeof fetch;
  baseUrl?: string;
};

export type DefaultHttpError = {
  status: number;
  message: string;
};

export const runTask =
  <E, A>(task: Task<E, A>, f: (either: Either<E, A>) => void) =>
  (): Promise<void> =>
    task.run().then(f);

export function httpTask<A = unknown>(
  path: string,
  options?: RequestInit
): Reader<HttpEnv, Task<DefaultHttpError, A>>;

export function httpTask<E, A>(
  path: string,
  options: RequestInit | undefined,
  handleError: (e: DefaultHttpError | unknown) => E
): Reader<HttpEnv, Task<E, A>>;

export function httpTask<E, A>(
  path: string,
  options?: RequestInit,
  handleError?: (e: DefaultHttpError | unknown) => E
): Reader<HttpEnv, Task<DefaultHttpError | E, A>> {
  return Reader((env: HttpEnv) =>
    Task<DefaultHttpError | E, A>(async (signal?: AbortSignal) => {
      const toDefaultError = (
        status: number,
        message: string
      ): DefaultHttpError => ({ status, message });

      const mapError = (e: DefaultHttpError | unknown): DefaultHttpError | E =>
        handleError ? handleError(e) : (e as DefaultHttpError);

      const base = env.baseUrl ?? "";

      let url: string;
      if (base === "") {
        url = path;
      } else {
        const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        url = normalizedBase + normalizedPath;
      }

      try {
        const res = await env.fetch(url, {
          ...options,
          signal,
        });

        if (!res.ok) {
          const baseErr = toDefaultError(
            res.status,
            res.statusText || "HTTP error"
          );
          return Left<DefaultHttpError | E>(mapError(baseErr));
        }

        try {
          const data = (await res.json()) as A;
          return Right<A>(data);
        } catch {
          const baseErr = toDefaultError(res.status, "Invalid JSON");
          return Left<DefaultHttpError | E>(mapError(baseErr));
        }
      } catch (e: any) {
        const baseErr = toDefaultError(
          0,
          e instanceof Error ? e.message : String(e)
        );
        return Left<DefaultHttpError | E>(mapError(baseErr));
      }
    })
  );
}
