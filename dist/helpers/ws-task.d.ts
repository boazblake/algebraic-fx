import type { Task as TaskT } from "../adt/task.js";
export type WebSocketEnv = {
    makeWebSocket: (url: string) => WebSocket;
};
export declare const wsTask: <E>(url: string, env: WebSocketEnv, onError?: (err: Event | Error) => E) => TaskT<E, WebSocket>;
//# sourceMappingURL=ws-task.d.ts.map