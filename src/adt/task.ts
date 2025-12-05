/**
 * Unique brand for nominal typing of Task values.
 * Prevents structural type collisions with plain objects.
 */
const TaskBrand = Symbol("TaskBrand");

import { Either, Left, Right } from "./either.js";

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
export const Task = <E, A>(
  run0: (signal?: AbortSignal) => Promise<Either<E, A>>
): Task<E, A> => ({
  [TaskBrand]: true,

  run: () => run0(),

  runWith: (signal: AbortSignal) => {
    if (!signal) {
      throw new Error(
        "Task.runWith requires an AbortSignal. Use run() if cancellation is not needed."
      );
    }
    return run0(signal);
  },

  map: <B>(f: (a: A) => B): Task<E, B> =>
    Task((signal) =>
      run0(signal).then((ea) =>
        ea._tag === "Right" ? Right<B>(f(ea.right)) : (ea as Either<E, B>)
      )
    ),

  chain: <B>(f: (a: A) => Task<E, B>): Task<E, B> =>
    Task((signal) =>
      run0(signal).then((ea) =>
        ea._tag === "Right"
          ? f(ea.right).runWith(signal as AbortSignal)
          : (Promise.resolve(ea) as Promise<Either<E, B>>)
      )
    ),

  ap: <B>(fb: Task<E, (a: A) => B>): Task<E, B> =>
    Task((signal) =>
      fb
        .runWith(signal as AbortSignal)
        .then((ef) =>
          ef._tag === "Right"
            ? run0(signal).then((ea) =>
                ea._tag === "Right"
                  ? Right<B>(ef.right(ea.right))
                  : (ea as Either<E, B>)
              )
            : (Promise.resolve(ef) as Promise<Either<E, B>>)
        )
    ),

  mapError: <E2>(f: (e: E) => E2): Task<E2, A> =>
    Task((signal) =>
      run0(signal).then((ea) =>
        ea._tag === "Left" ? Left<E2>(f(ea.left)) : (ea as Either<E2, A>)
      )
    ),

  bimap: <E2, B>(onError: (e: E) => E2, onSuccess: (a: A) => B): Task<E2, B> =>
    Task((signal) =>
      run0(signal).then((ea) =>
        ea._tag === "Left"
          ? Left<E2>(onError(ea.left))
          : Right<B>(onSuccess(ea.right))
      )
    ),
});

/**
 * Lift a value into a successful Task.
 */
Task.of = <A>(a: A): Task<never, A> => Task(() => Promise.resolve(Right<A>(a)));

/**
 * Construct a failing Task.
 */
Task.reject = <E>(e: E): Task<E, never> =>
  Task(() => Promise.resolve(Left<E>(e)));

/**
 * Wrap an abort-aware async registration function into a Task.
 *
 * @param register Function that takes an AbortSignal and returns a Promise<A>
 * @param onError Map unknown errors into E
 */
export const taskFromAbortable = <E, A>(
  register: (signal: AbortSignal) => Promise<A>,
  onError: (e: unknown) => E
): Task<E, A> =>
  Task((signal) => {
    const controller = signal === undefined ? new AbortController() : null;
    const effectiveSignal = signal ?? controller!.signal;

    return register(effectiveSignal)
      .then((a) => Right<A>(a))
      .catch((e) => Left<E>(onError(e)));
  });

/**
 * Wrap a Promise-returning function into a Task that catches errors.
 */
Task.tryCatch = <A>(f: () => Promise<A>): Task<unknown, A> =>
  Task(() => f().then(Right).catch(Left));

/**
 * tryCatch with custom error mapping.
 */
Task.tryCatchK = <E, A>(
  f: () => Promise<A>,
  onError: (e: unknown) => E
): Task<E, A> =>
  Task(() =>
    f()
      .then(Right)
      .catch((e) => Left(onError(e)))
  );

/** Point-free map. */
Task.map =
  <E, A, B>(f: (a: A) => B) =>
  (t: Task<E, A>): Task<E, B> =>
    t.map(f);

/** Point-free chain. */
Task.chain =
  <E, A, B>(f: (a: A) => Task<E, B>) =>
  (t: Task<E, A>): Task<E, B> =>
    t.chain(f);

/** Point-free ap. */
Task.ap =
  <E, A, B>(fb: Task<E, (a: A) => B>) =>
  (fa: Task<E, A>): Task<E, B> =>
    fa.ap(fb);

/** Point-free mapError. */
Task.mapError =
  <E, E2>(f: (e: E) => E2) =>
  <A>(t: Task<E, A>): Task<E2, A> =>
    t.mapError(f);

/** Point-free bimap. */
Task.bimap =
  <E, E2, A, B>(onError: (e: E) => E2, onSuccess: (a: A) => B) =>
  (t: Task<E, A>): Task<E2, B> =>
    t.bimap(onError, onSuccess);

/**
 * Consume a Task by converting its Either result into the final pure value.
 */
Task.fold =
  <E, A, B>(onError: (e: E) => B, onSuccess: (a: A) => B) =>
  (t: Task<E, A>): Promise<B> =>
    t
      .run()
      .then((ea) =>
        ea._tag === "Left" ? onError(ea.left) : onSuccess(ea.right)
      );

/**
 * Extract the success value with a default fallback.
 */
Task.getOrElse =
  <E, A>(defaultValue: A) =>
  (t: Task<E, A>): Promise<A> =>
    t.run().then((ea) => (ea._tag === "Right" ? ea.right : defaultValue));

/**
 * Delay a Task’s execution by N milliseconds (abort-aware).
 */
Task.delay =
  (ms: number) =>
  <E, A>(t: Task<E, A>): Task<E, A> =>
    Task(
      (signal) =>
        new Promise<Either<E, A>>((resolve) => {
          const id = setTimeout(() => {
            t.runWith(signal as AbortSignal).then(resolve);
          }, ms);

          if (signal) {
            signal.addEventListener(
              "abort",
              () => {
                clearTimeout(id);
                const abortError = {
                  message: "Task.delay aborted",
                } as unknown as E;
                resolve(Left<E>(abortError));
              },
              { once: true }
            );
          }
        })
    );

/**
 * Timeout a Task after N ms, returning a Left(onTimeout).
 */
Task.timeout =
  <E>(ms: number, onTimeout: E) =>
  <A>(t: Task<E, A>): Task<E, A> =>
    Task(
      (signal) =>
        new Promise<Either<E, A>>((resolve) => {
          const timeoutId = setTimeout(() => resolve(Left<E>(onTimeout)), ms);

          const chainRun = t.runWith(signal as AbortSignal).then((ea) => {
            clearTimeout(timeoutId);
            resolve(ea);
          });

          if (signal) {
            signal.addEventListener("abort", () => {
              clearTimeout(timeoutId);
            });
          }

          return chainRun;
        })
    );

/**
 * Execute Tasks sequentially, short-circuiting on Failure.
 */
Task.sequence = <E, A>(tasks: Task<E, A>[]): Task<E, A[]> =>
  Task((signal) =>
    (async () => {
      const results: A[] = [];
      for (const task of tasks) {
        const ea = await task.runWith(signal as AbortSignal);
        if (ea._tag === "Left") return ea;
        results.push(ea.right);
      }
      return Right<A[]>(results);
    })()
  );

/**
 * Traverse an array by mapping each element to a Task and sequencing.
 */
Task.traverse =
  <E, A, B>(f: (a: A) => Task<E, B>) =>
  (arr: A[]): Task<E, B[]> =>
    Task.sequence(arr.map(f));

/**
 * Run all Tasks in parallel.
 * Fails fast if any task fails.
 */
Task.all = <E, A>(tasks: Task<E, A>[]): Task<E, A[]> =>
  Task((signal) =>
    Promise.all(tasks.map((t) => t.runWith(signal as AbortSignal))).then(
      (results) => {
        const values: A[] = [];
        for (const ea of results) {
          if (ea._tag === "Left") return ea;
          values.push(ea.right);
        }
        return Right<A[]>(values);
      }
    )
  );

/**
 * Race multiple Tasks, resolving with the first to finish.
 */
Task.race = <E, A>(tasks: Task<E, A>[]): Task<E, A> =>
  Task((signal) =>
    Promise.race(tasks.map((t) => t.runWith(signal as AbortSignal)))
  );

/**
 * Lift an Either into a Task.
 */
Task.fromEither = <E, A>(e: Either<E, A>): Task<E, A> =>
  Task(() => Promise.resolve(e));

/**
 * Convert a Task into a Promise that throws on Left.
 */
Task.toPromise = <E, A>(t: Task<E, A>): Promise<A> =>
  t.run().then((ea) => {
    if (ea._tag === "Left") throw ea.left;
    return ea.right;
  });

export default Task;
