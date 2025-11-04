import { Reader, Task, Either } from "../adt/index.js";

export type HttpEnv = {
  fetch: typeof fetch;
  baseUrl?: string;
};


/** Default error shape for network errors */
export type DefaultHttpError = {
  status: number;
  message: string;
};

/**
 * Generic Reader–Task constructor for HTTP.
 * You can parameterize both the success (`A`) and error (`E`) types.
 */
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
          const err = (handleError
            ? handleError({ status: res.status, message })
            : ({ status: res.status, message } as E));
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

/**
 * Example:
 *
 * const getUsers = httpTask<User[]>("/users");
 * const task = getUsers.run({ fetch, baseUrl: "https://jsonplaceholder.typicode.com" });
 * const result = await task.run();
 */
