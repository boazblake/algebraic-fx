// src/helpers/ws-task.ts
import type { Task as TaskT } from "../adt/task.js";
import { TaskModule as Task } from "../adt/task.js";
import { left, right } from "../adt/either.js";

export type WebSocketEnv = {
  makeWebSocket: (url: string) => WebSocket;
};

export const wsTask = <E>(
  url: string,
  env: WebSocketEnv,
  onError?: (err: Event | Error) => E
): TaskT<E, WebSocket> => {
  return Task.fromPromise<E, WebSocket>(
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
  );
};
