import { Reader, Task, Either, IO } from "../adt/index.js";

export type HttpEnv = {
  fetch: typeof fetch;
  baseUrl?: string;
};

export type DefaultHttpError = {
  status: number;
  message: string;
};

export const runTaskAsIO = <E, A>(
  task: Task<E, A>,
  f: (either: Either<E, A>) => void
) =>
  IO(async () => {
    const either = await task.run();
    f(either);
  });

export const httpTask = <E = DefaultHttpError, A = unknown>(
  path: string,
  options?: RequestInit,
  handleError?: (e: unknown) => E
): Reader<HttpEnv, Task<E, A>> =>
  Reader((env) =>
    Task<E, A>(async () => {
      try {
        const res = await env.fetch(`${env.baseUrl ?? ""}${path}`, options);
        if (!res.ok) {
          // server error → Left<E>
          const message = res.statusText || "HTTP error";
          const err = handleError
            ? handleError({ status: res.status, message })
            : ({ status: res.status, message } as E);
          return Either.Left<E>(err);
        }

        // success → Right<A>
        const data = (await res.json()) as A;
        return Either.Right<A>(data);
      } catch (e: any) {
        const err = handleError
          ? handleError(e)
          : ({
              status: 0,
              message: e instanceof Error ? e.message : String(e),
            } as E);
        return Either.Left<E>(err);
      }
    })
  );
