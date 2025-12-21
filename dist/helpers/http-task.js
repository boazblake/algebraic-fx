// src/helpers/http-task.ts
import { Reader } from "../adt/reader.js";
import { TaskModule as Task } from "../adt/task.js";
import { isLeft } from "../adt/either.js";
/* ============================================================================
 * Helpers
 * ========================================================================== */
const makeError = (url, status, message, cause) => ({
    _tag: "DefaultHttpError",
    status,
    message,
    url,
    cause,
});
/* ============================================================================
 * httpTask
 * ========================================================================== */
/**
 * HTTP helper producing Reader<HttpEnv, Task<E | DefaultHttpError, A>>
 *
 * Semantics:
 * - Reader injects HttpEnv
 * - Task MAY fail
 * - Errors are DATA (not Msg)
 * - No dispatching here
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