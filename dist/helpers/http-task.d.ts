import type { Reader as ReaderT } from "../adt/reader.js";
import type { Task as TaskT } from "../adt/task.js";
import type { Either } from "../adt/either.js";
export type DefaultHttpError = {
    _tag: "DefaultHttpError";
    status: number | null;
    message: string;
    url: string;
    cause?: unknown;
};
export type HttpEnv = {
    baseUrl: string;
    fetch: typeof fetch;
};
export declare const httpTask: <E = never, A = never>(path: string, decode?: (data: unknown) => Either<E, A>, mapError?: (err: DefaultHttpError | E) => DefaultHttpError | E) => ReaderT<HttpEnv, TaskT<DefaultHttpError | E, A>>;
//# sourceMappingURL=http-task.d.ts.map