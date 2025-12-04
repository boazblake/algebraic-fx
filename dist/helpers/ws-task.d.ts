import { Task } from "../adt/task.js";
export type WSDefaultError = {
    message: string;
    code?: number;
};
/**
 * WebSocket boilerplate helper.
 * Returns a Task that resolves when the socket opens or fails.
 */
export declare const wsTask: <E = WSDefaultError>(url: string, protocols?: string | string[], onError?: (err: WSDefaultError | unknown) => E) => Task<E, WebSocket>;
//# sourceMappingURL=ws-task.d.ts.map