// src/helpers/ws-task.ts
import { Reader } from "../adt/reader.js";
import { TaskModule as Task } from "../adt/task.js";
/**
 * Construct a Task that opens a WebSocket connection.
 *
 * IMPORTANT:
 * - wsTask DOES NOT dispatch messages.
 * - It returns Reader<Env, Task<E, WebSocket>>.
 * - The caller MUST map the result into Msg if used as an effect.
 *
 * @typeParam E Error type produced on connection failure
 *
 * @param url WebSocket URL
 * @param onError Optional mapper for connection errors
 *
 * @returns Reader that produces a Task when run with WebSocketEnv
 *
 * @example
 * const connect =
 *   wsTask("/socket")
 *     .map(task =>
 *       task.map(ws => ({ type: "SocketOpened", ws }))
 *     );
 */
export const wsTask = (url, onError) => Reader((env) => Task.fromPromise(() => new Promise((resolve, reject) => {
    try {
        const ws = env.makeWebSocket(url);
        const handleOpen = () => {
            ws.removeEventListener("open", handleOpen);
            ws.removeEventListener("error", handleError);
            resolve(ws);
        };
        const handleError = (ev) => {
            ws.removeEventListener("open", handleOpen);
            ws.removeEventListener("error", handleError);
            reject(ev);
        };
        ws.addEventListener("open", handleOpen);
        ws.addEventListener("error", handleError);
    }
    catch (e) {
        reject(e);
    }
}), (err) => (onError ? onError(err) : err)));
//# sourceMappingURL=ws-task.js.map