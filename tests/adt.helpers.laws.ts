import fc from "fast-check";

/** Compare two values structurally (via JSON for simplicity). */
export const eq = <A>(a: A, b: A): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

/** Function generator for simple numeric transformations. */
export const fnNum = fc.func(fc.integer());
