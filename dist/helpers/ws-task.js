import { Task } from "../adt/task.js";
import { Left, Right } from "../adt/either.js";
/**
 * WebSocket boilerplate helper.
 * Returns a Task that resolves when the socket opens or fails.
 */
export const wsTask = (url, protocols, onError) => Task(async () => {
    return new Promise((resolve) => {
        try {
            const ws = new WebSocket(url, protocols);
            ws.onopen = () => resolve(Right(ws));
            ws.onerror = () => {
                const err = { message: "WebSocket error" };
                resolve(Left(onError ? onError(err) : err));
            };
            ws.onclose = (ev) => {
                const err = {
                    message: "WebSocket closed before open",
                    code: ev.code,
                };
                resolve(Left(onError ? onError(err) : err));
            };
        }
        catch (e) {
            const err = {
                message: e instanceof Error ? e.message : String(e),
            };
            resolve(Left(onError ? onError(err) : err));
        }
    });
});
//# sourceMappingURL=ws-task.js.map