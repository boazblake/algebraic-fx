/**
 * @module helpers/http-task
 *
 * Pure HTTP helper using Reader<HttpEnv, Task<E,A>>.
 *
 * This helper:
 *   - does not depend on Program or Effect
 *   - returns Task<E,A> for algebraic composition
 *   - respects AbortSignal provided by Task.run(signal?)
 *
 * Integrate with algebraic-fx by wrapping Task in an Effect<Env,Msg>.
 */
import { Reader } from "../adt/reader.js";
import { Task } from "../adt/task.js";
/**
 * Environment required by httpTask.
 */
export type HttpEnv = {
    fetch: typeof fetch;
    baseUrl?: string;
};
/**
 * Default error shape for HTTP failures.
 */
export type DefaultHttpError = {
    status: number;
    message: string;
};
export declare function httpTask<A = unknown>(path: string, options?: RequestInit): Reader<HttpEnv, Task<DefaultHttpError, A>>;
export declare function httpTask<E, A>(path: string, options: RequestInit | undefined, handleError: (e: DefaultHttpError | unknown) => E): Reader<HttpEnv, Task<E, A>>;
//# sourceMappingURL=http-task.d.ts.map