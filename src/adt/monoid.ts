// src/adt/monoid.ts
import { fl } from "./fl.js";

export type Monoid<A> = {
  readonly empty: A;
  readonly concat: (x: A, y: A) => A;
  readonly [fl.empty]?: A;
  readonly [fl.concat]?: (x: A, y: A) => A;
};

// helper
export const makeMonoid = <A>(
  empty: A,
  concat: (x: A, y: A) => A
): Monoid<A> => ({
  empty,
  concat,
  [fl.empty]: empty,
  [fl.concat]: concat,
});

/* ============================================================
   VALUE-LEVEL MONOIDS (required by laws tests)
   Used as: const M = monoidString
============================================================ */

export const monoidString: Monoid<string> = makeMonoid("", (a, b) => a + b);

export const monoidSum: Monoid<number> = makeMonoid(0, (a, b) => a + b);

export const monoidArray = <A>(): Monoid<A[]> =>
  makeMonoid<A[]>([], (xs, ys) => xs.concat(ys));

/* ============================================================
   FUNCTION VERSIONS (required by Writer tests)
   Used as: const M = monoidString()
============================================================ */

export const monoidStringFn = (): Monoid<string> => monoidString;

export const monoidSumFn = (): Monoid<number> => monoidSum;

/* ============================================================
   CONSTANT aliases (optional but harmless)
============================================================ */

export const MonoidString = monoidString;
export const MonoidSum = monoidSum;

/* ============================================================
   fold
============================================================ */

export const fold =
  <A>(M: Monoid<A>) =>
  (xs: A[]): A =>
    xs.reduce(M.concat, M.empty);
