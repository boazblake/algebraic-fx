import { Reader } from "../adt/reader.js";
import { Task } from "../adt/task.js";
import { Either } from "../adt/either.js";
export type HttpEnv = {
    fetch: typeof fetch;
    baseUrl?: string;
};
export type DefaultHttpError = {
    status: number;
    message: string;
};
export declare const runTask: <E, A>(task: Task<E, A>, f: (either: Either<E, A>) => void) => () => Promise<void>;
export declare function httpTask<A = unknown>(path: string, options?: RequestInit): Reader<HttpEnv, Task<DefaultHttpError, A>>;
export declare function httpTask<E, A>(path: string, options: RequestInit | undefined, handleError: (e: DefaultHttpError | unknown) => E): Reader<HttpEnv, Task<E, A>>;
//# sourceMappingURL=http-task.d.ts.map