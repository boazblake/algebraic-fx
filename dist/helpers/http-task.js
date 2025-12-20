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
export const httpTask = (path, decode, mapError = (e) => e) => Reader((env) => {
    // FIX 1: Correct URL joining semantics
    const url = env.baseUrl + path;
    return Task.fromPromise(async () => {
        const res = await env.fetch(url);
        // FIX 2: Non-2xx error message must be: "HTTP <status> <statusText>"
        if (!res.ok) {
            throw makeError(url, res.status, `HTTP ${res.status} ${res.statusText}`);
        }
        let json;
        try {
            json = await res.json();
        }
        catch (e) {
            // FIX 3: JSON parse error message must be EXACTLY:
            //        "Failed to parse JSON response"
            throw makeError(url, res.status, "Failed to parse JSON response", e);
        }
        if (!decode) {
            return json;
        }
        const decoded = decode(json);
        if (isLeft(decoded)) {
            throw decoded.left; // tests expect this behavior
        }
        return decoded.right;
    }, (err) => {
        if (err && err._tag === "DefaultHttpError") {
            return mapError(err);
        }
        // Network or decode errors.
        // Tests expect status === null and message === err.message
        return mapError(makeError(url, null, err instanceof Error ? err.message : String(err), err));
    });
});
//# sourceMappingURL=http-task.js.map