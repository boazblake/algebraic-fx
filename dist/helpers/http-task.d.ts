import type { Reader as ReaderT } from "../adt/reader.js";
import type { Task as TaskT } from "../adt/task.js";
export type HttpEnv = {
    baseUrl: string;
    fetch: typeof fetch;
};
export type HttpError = {
    _tag: "HttpError";
    status: number | null;
    message: string;
    url: string;
    cause?: unknown;
};
/**
 * HTTP effect that ALWAYS resolves to a Msg.
 *
 * - Reader injects HttpEnv
 * - Task NEVER fails (E = never)
 * - All failures are mapped into Msg in the Promise itself
 */
export declare const httpTask: <Msg>(path: string, onSuccess: (data: unknown) => Msg, onError: (err: HttpError) => Msg) => ReaderT<HttpEnv, TaskT<never, Msg>>;
//# sourceMappingURL=http-task.d.ts.map