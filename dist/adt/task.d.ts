import { fl } from "./fl.js";
import type { Either } from "./either.js";
import type { IO } from "./io.js";
/**
 * Task<E, A> represents an async computation that can fail with E or succeed with A.
 * It always resolves to Either<E, A>.
 */
export interface Task<E, A> {
    readonly _tag: "Task";
    readonly run: () => Promise<Either<E, A>>;
    readonly runWith: <R>(onError: (e: E) => R | Promise<R>, onSuccess: (a: A) => R | Promise<R>) => Promise<R>;
    readonly [fl.map]: <B>(f: (a: A) => B) => Task<E, B>;
    readonly [fl.chain]: <B>(f: (a: A) => Task<E, B>) => Task<E, B>;
    readonly [fl.ap]: <B>(fab: Task<E, (a: A) => B>) => Task<E, B>;
}
export declare const TaskModule: {
    readonly of: <E = never, A = never>(a: A) => Task<E, A>;
    readonly fail: <E = unknown, A = never>(e: E) => Task<E, A>;
    readonly map: <E, A, B>(f: (a: A) => B) => (fa: Task<E, A>) => Task<E, B>;
    readonly chain: <E, A, B>(f: (a: A) => Task<E, B>) => (fa: Task<E, A>) => Task<E, B>;
    /**
     * Applicative ap:
     *   ap(tf)(tv) ≡ tv.ap(tf)
     * where tf: Task<E, (a: A) => B>, tv: Task<E, A>.
     */
    readonly ap: <E, A, B>(tf: Task<E, (a: A) => B>) => (tv: Task<E, A>) => Task<E, B>;
    readonly fromIO: <E = never, A = never>(io: IO<A>) => Task<E, A>;
    readonly fromEither: <E, A>(ea: Either<E, A>) => Task<E, A>;
    readonly fromPromise: <E = unknown, A = unknown>(thunk: () => Promise<A>, onError: (e: unknown) => E) => Task<E, A>;
    readonly tryCatch: <E = unknown, A = unknown>(thunk: () => A, onError: (e: unknown) => E) => Task<E, A>;
    readonly isTask: (u: unknown) => u is Task<unknown, unknown>;
    readonly [fl_of]: <A>(a: A) => Task<never, A>;
    readonly [fl_map]: (f: (a: any) => any) => (fa: Task<any, any>) => Task<any, any>;
    readonly [fl_chain]: (f: (a: any) => Task<any, any>) => (fa: Task<any, any>) => Task<any, any>;
    readonly [fl_ap]: (tf: Task<any, (a: any) => any>) => (tv: Task<any, any>) => Task<any, any>;
};
export declare const of: <E = never, A = never>(a: A) => Task<E, A>;
export declare const fail: <E = unknown, A = never>(e: E) => Task<E, A>;
export declare const map: <E, A, B>(f: (a: A) => B) => (fa: Task<E, A>) => Task<E, B>;
export declare const chain: <E, A, B>(f: (a: A) => Task<E, B>) => (fa: Task<E, A>) => Task<E, B>;
export declare const ap: <E, A, B>(tf: Task<E, (a: A) => B>) => (tv: Task<E, A>) => Task<E, B>;
export declare const fromIO: <E = never, A = never>(io: IO<A>) => Task<E, A>;
export declare const fromEither: <E, A>(ea: Either<E, A>) => Task<E, A>;
export declare const fromPromise: <E = unknown, A = unknown>(thunk: () => Promise<A>, onError: (e: unknown) => E) => Task<E, A>;
export declare const tryCatch: <E = unknown, A = unknown>(thunk: () => A, onError: (e: unknown) => E) => Task<E, A>;
export declare const isTask: (u: unknown) => u is Task<unknown, unknown>;
export type { Task as TaskT };
//# sourceMappingURL=task.d.ts.map