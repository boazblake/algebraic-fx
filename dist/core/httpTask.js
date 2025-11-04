import { Reader, Task, Either } from "../adt/index.js";
/**
 * Generic Reader–Task constructor for HTTP.
 * You can parameterize both the success (`A`) and error (`E`) types.
 */
export const httpTask = (path, options, handleError) => Reader((env) => Task(async () => {
    try {
        const res = await env.fetch(`${env.baseUrl ?? ""}${path}`, options);
        if (!res.ok) {
            // server error → Left<E>
            const message = res.statusText || "HTTP error";
            const err = (handleError
                ? handleError({ status: res.status, message })
                : { status: res.status, message });
            return Either.Left(err);
        }
        // success → Right<A>
        const data = (await res.json());
        return Either.Right(data);
    }
    catch (e) {
        const err = handleError
            ? handleError(e)
            : {
                status: 0,
                message: e instanceof Error ? e.message : String(e),
            };
        return Either.Left(err);
    }
}));
/**
 * Example:
 *
 * const getUsers = httpTask<User[]>("/users");
 * const task = getUsers.run({ fetch, baseUrl: "https://jsonplaceholder.typicode.com" });
 * const result = await task.run();
 */
