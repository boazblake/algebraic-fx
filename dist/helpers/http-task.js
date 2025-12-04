import { Reader } from "../adt/reader.js";
import { Task } from "../adt/task.js";
import { Left, Right } from "../adt/either.js";
export const runTask = (task, f) => () => task.run().then(f);
/**
 * Create an HTTP request Task inside a Reader<HttpEnv,_>.
 *
 * @param path URL path (resolved against baseUrl)
 * @param options Fetch options (optional)
 * @param handleError Optional mapper to convert default errors to user-defined errors
 *
 * @returns Reader<HttpEnv, Task<E, A>>
 *
 * @example
 * const getUser = httpTask<User>("/users/1");
 * getUser.run(httpEnv).runWith(signal);
 */
export function httpTask(path, options, handleError) {
    return Reader((env) => Task(async (signal) => {
        const toDefaultError = (status, message) => ({ status, message });
        const mapError = (e) => handleError ? handleError(e) : e;
        const base = env.baseUrl ?? "";
        let url;
        if (base === "") {
            url = path;
        }
        else {
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
                const baseErr = toDefaultError(res.status, res.statusText || "HTTP error");
                return Left(mapError(baseErr));
            }
            try {
                const data = (await res.json());
                return Right(data);
            }
            catch {
                const baseErr = toDefaultError(res.status, "Invalid JSON");
                return Left(mapError(baseErr));
            }
        }
        catch (e) {
            const baseErr = toDefaultError(0, e instanceof Error ? e.message : String(e));
            return Left(mapError(baseErr));
        }
    }));
}
//# sourceMappingURL=http-task.js.map