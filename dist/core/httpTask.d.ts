import { Reader, Task, Either, IO } from "../adt/index.js";
export type HttpEnv = {
    fetch: typeof fetch;
    baseUrl?: string;
};
export type DefaultHttpError = {
    status: number;
    message: string;
};
export declare const runTaskAsIO: <E, A>(task: Task<E, A>, f: (either: Either<E, A>) => void) => IO<Promise<void>>;
export declare const httpTask: <E = DefaultHttpError, A = unknown>(path: string, options?: RequestInit, handleError?: (e: unknown) => E) => Reader<HttpEnv, Task<E, A>>;
//# sourceMappingURL=httpTask.d.ts.map