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
 * Construct a Reader<HttpEnv, Task<E,A>> that performs a JSON HTTP request.
 *
 * @param path        URL path (resolved against HttpEnv.baseUrl if present)
 * @param options     fetch options
 * @param handleError optional mapper from DefaultHttpError | unknown to user E
 */
export function httpTask(path, options, handleError) {
    return Reader((env) => Task(async (signal) => {
        const toDefaultError = (status, message) => ({ status, message });
        const mapError = (e) => handleError ? handleError(e) : e;
        const base = env.baseUrl ?? "";
        const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        const url = base ? normalizedBase + normalizedPath : path;
        try {
            const res = await env.fetch(url, { ...options, signal });
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