import { Reader, Task } from "../adt/index.js";
export type HttpEnv = {
    fetch: typeof fetch;
    baseUrl?: string;
};
/** Default error shape for network errors */
export type DefaultHttpError = {
    status: number;
    message: string;
};
/**
 * Generic Reader–Task constructor for HTTP.
 * You can parameterize both the success (`A`) and error (`E`) types.
 */
export declare const httpTask: <E = DefaultHttpError, A = unknown>(path: string, options?: RequestInit, handleError?: (e: unknown) => E) => Reader<HttpEnv, Task<E, A>>;
/**
 * Example:
 *
 * const getUsers = httpTask<User[]>("/users");
 * const task = getUsers.run({ fetch, baseUrl: "https://jsonplaceholder.typicode.com" });
 * const result = await task.run();
 */
