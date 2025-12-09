/**
 * Unique brand for nominal typing of Task values.
 * Prevents structural type collisions with plain objects.
 */
declare const TaskBrand: unique symbol;
import { Either } from "./either.js";
/**
 * Lazy asynchronous computation that:
 *
 * - may fail with `E` or succeed with `A`
 * - does not execute until `.run()` or `.runWith(signal)` is called
 * - supports cancellation via AbortSignal
 * - supports mapping, chaining, bimap, mapError, applicative ap
 *
 * Task semantics:
 * - `run()` executes without cancellation
 * - `runWith(signal)` executes with cancellation support
 *
 * @typeParam E Error type
 * @typeParam A Result type
 */
export type Task<E, A> = {
    readonly [TaskBrand]: true;
    /** Start the async computation with no AbortSignal. */
    run: () => Promise<Either<E, A>>;
    /**
     * Start the async computation with cancellation support.
     * Throws if no AbortSignal is provided.
     */
    runWith: (signal: AbortSignal) => Promise<Either<E, A>>;
    /** Transform the result value on success. */
    map: <B>(f: (a: A) => B) => Task<E, B>;
    /** Chain another Task-producing function. */
    chain: <B>(f: (a: A) => Task<E, B>) => Task<E, B>;
    /** Applicative apply. */
    ap: <B>(fb: Task<E, (a: A) => B>) => Task<E, B>;
    /** Map the error side only. */
    mapError: <E2>(f: (e: E) => E2) => Task<E2, A>;
    /** Map error OR value depending on outcome. */
    bimap: <E2, B>(onError: (e: E) => E2, onSuccess: (a: A) => B) => Task<E2, B>;
};
/**
 * Construct a Task given a function that accepts an optional AbortSignal.
 *
 * The returned Task is lazy and will not run until `.run()` or `.runWith(signal)` is called.
 *
 * @param run0 Underlying async function returning `Either<E, A>`
 */
export declare const Task: {
    <E, A>(run0: (signal?: AbortSignal) => Promise<Either<E, A>>): Task<E, A>;
    of<A>(a: A): Task<never, A>;
    reject<E>(e: E): Task<E, never>;
    fromAbortable<E, A>(register: (signal: AbortSignal) => Promise<A>, onError: (e: unknown) => E): Task<E, A>;
    tryCatch<A>(f: () => Promise<A>): Task<unknown, A>;
    tryCatchK<E, A>(f: () => Promise<A>, onError: (e: unknown) => E): Task<E, A>;
    map<E, A, B>(f: (a: A) => B): (t: Task<E, A>) => Task<E, B>;
    chain<E, A, B>(f: (a: A) => Task<E, B>): (t: Task<E, A>) => Task<E, B>;
    ap<E, A, B>(fb: Task<E, (a: A) => B>): (fa: Task<E, A>) => Task<E, B>;
    mapError<E, E2>(f: (e: E) => E2): <A>(t: Task<E, A>) => Task<E2, A>;
    bimap<E, E2, A, B>(onError: (e: E) => E2, onSuccess: (a: A) => B): (t: Task<E, A>) => Task<E2, B>;
    fold<E, A, B>(onError: (e: E) => B, onSuccess: (a: A) => B): (t: Task<E, A>) => Promise<B>;
    getOrElse<E, A>(defaultValue: A): (t: Task<E, A>) => Promise<A>;
    delay(ms: number): <E, A>(t: Task<E, A>) => Task<E, A>;
    timeout<E>(ms: number, onTimeout: E): <A>(t: Task<E, A>) => Task<E, A>;
    sequence<E, A>(tasks: Task<E, A>[]): Task<E, A[]>;
    traverse<E, A, B>(f: (a: A) => Task<E, B>): (arr: A[]) => Task<E, B[]>;
    all<E, A>(tasks: Task<E, A>[]): Task<E, A[]>;
    race<E, A>(tasks: Task<E, A>[]): Task<E, A>;
    fromEither<E, A>(e: Either<E, A>): Task<E, A>;
    toPromise<E, A>(t: Task<E, A>): Promise<A>;
};
export default Task;
//# sourceMappingURL=task.d.ts.map