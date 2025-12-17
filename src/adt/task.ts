// src/adt/task.ts
import { fl } from "./fl.js";
import type { Either } from "./either.js";
import { left, right } from "./either.js";
import type { IO } from "./io.js";

/**
 * Task<E, A> represents an async computation that can fail with E or succeed with A.
 * It always resolves to Either<E, A>.
 */
export interface Task<E, A> {
  readonly _tag: "Task";
  readonly run: () => Promise<Either<E, A>>;
  readonly runWith: <R>(
    onError: (e: E) => R | Promise<R>,
    onSuccess: (a: A) => R | Promise<R>
  ) => Promise<R>;

  // Fantasy-Land instance methods
  readonly [fl.map]: <B>(f: (a: A) => B) => Task<E, B>;
  readonly [fl.chain]: <B>(f: (a: A) => Task<E, B>) => Task<E, B>;
  readonly [fl.ap]: <B>(fab: Task<E, (a: A) => B>) => Task<E, B>;
}

/**
 * Internal constructor that wires up FL methods using `this`.
 */
const makeTask = <E, A>(run: () => Promise<Either<E, A>>): Task<E, A> => {
  const self: Task<E, A> = {
    _tag: "Task",
    run,

    runWith<R>(
      this: Task<E, A>,
      onError: (e: E) => R | Promise<R>,
      onSuccess: (a: A) => R | Promise<R>
    ): Promise<R> {
      return this.run().then((ea) =>
        ea._tag === "Left" ? onError(ea.left) : onSuccess(ea.right)
      );
    },

    [fl.map]<B>(this: Task<E, A>, f: (a: A) => B): Task<E, B> {
      return makeTask(() =>
        this.run().then((ea) =>
          ea._tag === "Left" ? (ea as Either<E, B>) : right<E, B>(f(ea.right))
        )
      );
    },

    [fl.chain]<B>(this: Task<E, A>, f: (a: A) => Task<E, B>): Task<E, B> {
      return makeTask(() =>
        this.run().then((ea) =>
          ea._tag === "Left" ? (ea as Either<E, B>) : f(ea.right).run()
        )
      );
    },

    /**
     * Instance ap: valueTask.ap(functionTask)
     *
     * This matches how the tests use it:
     *   value[fl.ap](functionTask)
     */
    [fl.ap]<B>(this: Task<E, A>, fab: Task<E, (a: A) => B>): Task<E, B> {
      return makeTask(() =>
        Promise.all([fab.run(), this.run()]).then(([ef, ea]) => {
          if (ef._tag === "Left") return ef as Either<E, B>;
          if (ea._tag === "Left") return ea as Either<E, B>;
          return right<E, B>(ef.right(ea.right));
        })
      );
    },
  };

  return self;
};

/* ========================================================================== */
/* Module-level helpers                                                       */
/* ========================================================================== */

export const TaskModule = {
  of<E = never, A = never>(a: A): Task<E, A> {
    return makeTask(() => Promise.resolve(right<E, A>(a)));
  },

  fail<E = unknown, A = never>(e: E): Task<E, A> {
    return makeTask(() => Promise.resolve(left<E, A>(e)));
  },

  map<E, A, B>(f: (a: A) => B) {
    return (fa: Task<E, A>): Task<E, B> => (fa as any)[fl.map](f);
  },

  chain<E, A, B>(f: (a: A) => Task<E, B>) {
    return (fa: Task<E, A>): Task<E, B> => (fa as any)[fl.chain](f);
  },

  /**
   * Applicative ap:
   *   ap(tf)(tv) ≡ tv.ap(tf)
   * where tf: Task<E, (a: A) => B>, tv: Task<E, A>.
   */
  ap<E, A, B>(tf: Task<E, (a: A) => B>) {
    return (tv: Task<E, A>): Task<E, B> => (tv as any)[fl.ap](tf);
  },

  fromIO<E = never, A = never>(io: IO<A>): Task<E, A> {
    return makeTask(() => Promise.resolve(right<E, A>(io.run())));
  },

  fromEither<E, A>(ea: Either<E, A>): Task<E, A> {
    return makeTask(() => Promise.resolve(ea));
  },

  fromPromise<E = unknown, A = unknown>(
    thunk: () => Promise<A>,
    onError: (e: unknown) => E
  ): Task<E, A> {
    return makeTask(() =>
      thunk().then(
        (a) => right<E, A>(a),
        (e) => left<E, A>(onError(e))
      )
    );
  },

  tryCatch<E = unknown, A = unknown>(
    thunk: () => A,
    onError: (e: unknown) => E
  ): Task<E, A> {
    return makeTask(() => {
      try {
        const a = thunk();
        return Promise.resolve(right<E, A>(a));
      } catch (e) {
        return Promise.resolve(left<E, A>(onError(e)));
      }
    });
  },

  isTask(u: unknown): u is Task<unknown, unknown> {
    return (
      !!u &&
      typeof u === "object" &&
      typeof (u as any).run === "function" &&
      typeof (u as any).runWith === "function" &&
      (u as any)._tag === "Task"
    );
  },

  // Fantasy-Land constructor-level helpers (rarely used, but fine to expose)
  [fl.of]<A>(a: A): Task<never, A> {
    return TaskModule.of(a);
  },

  [fl.map](f: (a: any) => any) {
    return (fa: Task<any, any>): Task<any, any> => TaskModule.map(f)(fa);
  },

  [fl.chain](f: (a: any) => Task<any, any>) {
    return (fa: Task<any, any>): Task<any, any> => TaskModule.chain(f)(fa);
  },

  [fl.ap](tf: Task<any, (a: any) => any>) {
    return (tv: Task<any, any>): Task<any, any> => TaskModule.ap(tf)(tv);
  },
} as const;

/* ========================================================================== */
/* Top-level exports used by tests                                            */
/* ========================================================================== */

export const of = TaskModule.of;
export const fail = TaskModule.fail;
export const map = TaskModule.map;
export const chain = TaskModule.chain;
export const ap = TaskModule.ap;
export const fromIO = TaskModule.fromIO;
export const fromEither = TaskModule.fromEither;
export const fromPromise = TaskModule.fromPromise;
export const tryCatch = TaskModule.tryCatch;
export const isTask = TaskModule.isTask;

export type { Task as TaskT };
