// src/helpers/http-task.ts
import { Reader } from "../adt/reader.js";
import { TaskModule as Task } from "../adt/task.js";
import { isLeft } from "../adt/either.js";
const makeError = (url, status, message, cause) => ({
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
export const httpTask = (path, decode, mapError = (e) => e) => Reader((env) => {
    const url = env.baseUrl + path;
    return Task.fromPromise(async () => {
        const res = await env.fetch(url);
        if (!res.ok) {
            throw makeError(url, res.status, `HTTP ${res.status} ${res.statusText}`);
        }
        let json;
        try {
            json = await res.json();
        }
        catch (e) {
            throw makeError(url, res.status, "Failed to parse JSON response", e);
        }
        if (!decode) {
            return json;
        }
        const decoded = decode(json);
        if (isLeft(decoded)) {
            throw decoded.left;
        }
        return decoded.right;
    }, (err) => {
        if (err && err._tag === "DefaultHttpError") {
            return mapError(err);
        }
        return mapError(makeError(url, null, err instanceof Error ? err.message : String(err), err));
    });
});
//# sourceMappingURL=http-task.js.map