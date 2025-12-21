// src/helpers/http-task.ts
import { ReaderModule as Reader } from "../adt/reader.js";
import { TaskModule as Task } from "../adt/task.js";
/* ============================================================================
 * httpTask
 * ========================================================================== */
/**
 * HTTP effect that ALWAYS resolves to a Msg.
 *
 * - Reader injects HttpEnv
 * - Task NEVER fails (E = never)
 * - All failures are mapped into Msg in the Promise itself
 */
export const httpTask = (path, onSuccess, onError) => Reader.of(Task.fromPromise(() => fetchPromise(path, onSuccess, onError), unreachable));
/* ============================================================================
 * Internal helpers
 * ========================================================================== */
const unreachable = (_) => {
    throw new Error("Unreachable: Task<never, Msg> rejected");
};
const fetchPromise = async (path, onSuccess, onError) => {
    const url = path;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            return onError({
                _tag: "HttpError",
                status: res.status,
                message: `HTTP ${res.status} ${res.statusText}`,
                url,
            });
        }
        let json;
        try {
            json = await res.json();
        }
        catch (e) {
            return onError({
                _tag: "HttpError",
                status: res.status,
                message: "Failed to parse JSON response",
                url,
                cause: e,
            });
        }
        return onSuccess(json);
    }
    catch (e) {
        return onError({
            _tag: "HttpError",
            status: null,
            message: e instanceof Error ? e.message : String(e),
            url,
            cause: e,
        });
    }
};
//# sourceMappingURL=http-task.js.map