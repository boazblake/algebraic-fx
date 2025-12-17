import { TaskModule as Task } from "../adt/task.js";
export const wsTask = (url, env, onError) => {
    return Task.fromPromise(() => new Promise((resolve, reject) => {
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
    }), (err) => (onError ? onError(err) : err));
};
//# sourceMappingURL=ws-task.js.map