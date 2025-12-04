import { Task } from "../adt/task.js";
/**
 * WebSocket connection as a Task.
 *
 * - Runs a WebSocket handshake
 * - Resolves with Right<WebSocket> on success
 * - Resolves with Left<WSDefaultError> on failure/close
 * - Can be combined with Task.timeout() or Task.race()
 */
export type WSDefaultError = {
    message: string;
    code?: number;
};
/**
 * WebSocket boilerplate helper.
 * Returns a Task that resolves when the socket opens or fails.
 */
/**
 * Create a Task that opens a WebSocket connection.
 *
 * @param url WebSocket URL
 * @param protocols Optional subprotocols
 * @param onError Optional error mapper
 *
 * @returns Task<E, WebSocket>
 *
 * @example
 * const connect = wsTask("wss://example.com/ws");
 * connect.run().then(ea => ea.fold(console.error, ws => ws.send("hello")));
 */
export declare const wsTask: <E = WSDefaultError>(url: string, protocols?: string | string[], onError?: (err: WSDefaultError | unknown) => E) => Task<E, WebSocket>;
//# sourceMappingURL=ws-task.d.ts.map