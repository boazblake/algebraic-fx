// src/adt/reader.ts
import { fl } from "./fl.js";

// ======================================================
// Core Reader type
// ======================================================

export interface Reader<R, A> {
  readonly _tag: "Reader";
  readonly run: (r: R) => A;

  // Concrete methods
  readonly map: <B>(f: (a: A) => B) => Reader<R, B>;
  readonly chain: <B>(f: (a: A) => Reader<R, B>) => Reader<R, B>;
  readonly ap: <B>(
    this: Reader<R, (a: any) => B>,
    fa: Reader<R, any>
  ) => Reader<R, B>;

  // Fantasy-Land aliases
  readonly [fl.map]: <B>(f: (a: A) => B) => Reader<R, B>;
  readonly [fl.chain]: <B>(f: (a: A) => Reader<R, B>) => Reader<R, B>;
  readonly [fl.ap]: <B>(
    this: Reader<R, (a: any) => B>,
    fa: Reader<R, any>
  ) => Reader<R, B>;
}

// Constructor type so tests can call Reader.of / Reader.ask / Reader.asks
export interface ReaderConstructor {
  <R, A>(run: (r: R) => A): Reader<R, A>;
  of: <R, A>(a: A) => Reader<R, A>;
  ask: <R>() => Reader<R, R>;
  asks: <R, A>(f: (r: R) => A) => Reader<R, A>;
}

// ======================================================
// Internal constructor
// ======================================================

const makeReader = <R, A>(run: (r: R) => A): Reader<R, A> => {
  const self = {
    _tag: "Reader" as const,
    run,

    map<B>(f: (a: A) => B): Reader<R, B> {
      return makeReader((r: R) => f(run(r)));
    },

    chain<B>(f: (a: A) => Reader<R, B>): Reader<R, B> {
      return makeReader((r: R) => f(run(r)).run(r));
    },

    ap<B>(this: Reader<R, (a: any) => B>, fa: Reader<R, any>): Reader<R, B> {
      return makeReader((r: R) => this.run(r)(fa.run(r)));
    },

    [fl.map]<B>(this: Reader<R, A>, f: (a: A) => B): Reader<R, B> {
      return this.map(f);
    },

    [fl.chain]<B>(this: Reader<R, A>, f: (a: A) => Reader<R, B>): Reader<R, B> {
      return this.chain(f);
    },

    [fl.ap]<B>(
      this: Reader<R, (a: any) => B>,
      fa: Reader<R, any>
    ): Reader<R, B> {
      return this.ap(fa);
    },
  } as Reader<R, A>;

  return self;
};

// ======================================================
// Public constructors: of / ask / asks
// ======================================================

export const of = <R, A>(a: A): Reader<R, A> => makeReader(() => a);

export const ask = <R>(): Reader<R, R> => makeReader((r: R) => r);

export const asks = <R, A>(f: (r: R) => A): Reader<R, A> =>
  makeReader((r: R) => f(r));

// ======================================================
// Exported Reader value (with static helpers)
// ======================================================

export const Reader: ReaderConstructor = Object.assign(
  <R, A>(run: (r: R) => A): Reader<R, A> => makeReader(run),
  {
    of,
    ask,
    asks,
  }
);

// ======================================================
// Type guard
// ======================================================

export const isReader = (u: unknown): u is Reader<unknown, unknown> =>
  !!u &&
  typeof u === "object" &&
  (u as any)._tag === "Reader" &&
  typeof (u as any).run === "function";

// ======================================================
// fp-ts style helpers
// ======================================================

export const map =
  <A, B>(f: (a: A) => B) =>
  <R>(fa: Reader<R, A>): Reader<R, B> =>
    fa.map(f);

export const chain =
  <A, B>(f: (a: A) => Reader<any, B>) =>
  <R>(fa: Reader<R, A>): Reader<R, B> =>
    fa.chain(f as (a: A) => Reader<R, B>);

export const ap =
  <R, A, B>(fab: Reader<R, (a: A) => B>) =>
  (fa: Reader<R, A>): Reader<R, B> =>
    fab.ap(fa as any);

// ======================================================
// ReaderModule (used by tests)
// ======================================================

export const ReaderModule = {
  URI: "Reader",
  of,
  map: <R, A, B>(fa: Reader<R, A>, f: (a: A) => B): Reader<R, B> => fa.map(f),
  chain: <R, A, B>(fa: Reader<R, A>, f: (a: A) => Reader<R, B>): Reader<R, B> =>
    fa.chain(f),
  ap: <R, A, B>(fab: Reader<R, (a: A) => B>, fa: Reader<R, A>): Reader<R, B> =>
    fab.ap(fa as any),
  [fl.of]: of,
} as const;
