// src/adt/io.ts
import { fl } from "./fl.js";

export interface IO<A> {
  readonly _tag: "IO";
  readonly run: () => A;

  readonly [fl.map]: <B>(f: (a: A) => B) => IO<B>;
  readonly [fl.chain]: <B>(f: (a: A) => IO<B>) => IO<B>;
  readonly [fl.ap]: <B>(fa: IO<A>) => IO<B>;
}

export const IO_URI = "IO";

const makeIO = <A>(run: () => A): IO<A> => {
  const self: IO<A> = {
    _tag: "IO",
    run,

    [fl.map]<B>(f: (a: A) => B): IO<B> {
      return makeIO(() => f(run()));
    },

    [fl.chain]<B>(f: (a: A) => IO<B>): IO<B> {
      return makeIO(() => f(run()).run());
    },

    [fl.ap]<B>(this: IO<(a: A) => B>, fa: IO<A>): IO<B> {
      return makeIO(() => this.run()(fa.run()));
    },
  };

  return self;
};

// public constructor
export const IO = <A>(thunk: () => A): IO<A> => makeIO(thunk);

// fp-style helpers implemented via run, not via FL symbols
export const of = <A>(a: A): IO<A> => makeIO(() => a);

export const map =
  <A, B>(f: (a: A) => B) =>
  (fa: IO<A>): IO<B> =>
    IO(() => f(fa.run()));

export const chain =
  <A, B>(f: (a: A) => IO<B>) =>
  (fa: IO<A>): IO<B> =>
    IO(() => f(fa.run()).run());

export const ap =
  <A, B>(fab: IO<(a: A) => B>) =>
  (fa: IO<A>): IO<B> =>
    IO(() => fab.run()(fa.run()));

export const isIO = (u: unknown): u is IO<unknown> =>
  typeof u === "object" &&
  u !== null &&
  (u as any)._tag === "IO" &&
  typeof (u as any).run === "function";

export const fromThunk = <A>(thunk: () => A): IO<A> => IO(thunk);
export const toThunk = <A>(io: IO<A>): (() => A) => io.run;

// fp-ts-style module
export const ioModule = {
  URI: IO_URI,
  of,
  map: <A, B>(fa: IO<A>, f: (a: A) => B): IO<B> => map(f)(fa),
  ap: <A, B>(fab: IO<(a: A) => B>, fa: IO<A>): IO<B> => ap(fab)(fa),
  chain: <A, B>(fa: IO<A>, f: (a: A) => IO<B>): IO<B> => chain(f)(fa),
  [fl.of]: of,
} as const;
