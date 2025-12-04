import { Task } from "../adt/task.js";
import { Either, Left, Right } from "../adt/either.js";

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
export const wsTask = <E = WSDefaultError>(
  url: string,
  protocols?: string | string[],
  onError?: (err: WSDefaultError | unknown) => E
): Task<E, WebSocket> =>
  Task(async () => {
    return new Promise((resolve) => {
      try {
        const ws = new WebSocket(url, protocols);

        ws.onopen = () => resolve(Right(ws));

        ws.onerror = () => {
          const err: WSDefaultError = { message: "WebSocket error" };
          resolve(Left(onError ? onError(err) : (err as E)));
        };

        ws.onclose = (ev) => {
          const err: WSDefaultError = {
            message: "WebSocket closed before open",
            code: ev.code,
          };
          resolve(Left(onError ? onError(err) : (err as E)));
        };
      } catch (e) {
        const err: WSDefaultError = {
          message: e instanceof Error ? e.message : String(e),
        };
        resolve(Left(onError ? onError(err) : (err as E)));
      }
    });
  });
