// src/helpers/ws-task.ts

import type { Reader as ReaderT } from "../adt/reader.js";
import { Reader } from "../adt/reader.js";

import type { Task as TaskT } from "../adt/task.js";
import { TaskModule as Task } from "../adt/task.js";

/**
 * Environment required to construct WebSocket connections.
 *
 * This is intentionally abstract to allow:
 * - browser WebSocket
 * - mocked WebSocket in tests
 * - custom implementations
 */
export type WebSocketEnv = {
  /** Factory for creating a WebSocket instance. */
  makeWebSocket: (url: string) => WebSocket;
};

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
export const wsTask = <E = unknown>(
  url: string,
  onError?: (err: Event | Error) => E
): ReaderT<WebSocketEnv, TaskT<E, WebSocket>> =>
  Reader((env: WebSocketEnv) =>
    Task.fromPromise<E, WebSocket>(
      () =>
        new Promise<WebSocket>((resolve, reject) => {
          try {
            const ws = env.makeWebSocket(url);

            const handleOpen = () => {
              ws.removeEventListener("open", handleOpen);
              ws.removeEventListener("error", handleError);
              resolve(ws);
            };

            const handleError = (ev: Event) => {
              ws.removeEventListener("open", handleOpen);
              ws.removeEventListener("error", handleError);
              reject(ev);
            };

            ws.addEventListener("open", handleOpen);
            ws.addEventListener("error", handleError);
          } catch (e) {
            reject(e);
          }
        }),

      (err: unknown) => (onError ? onError(err as any) : (err as E))
    )
  );
