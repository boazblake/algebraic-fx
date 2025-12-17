// src/adt/monoid.ts
import { fl } from "./fl.js";
// helper
export const makeMonoid = (empty, concat) => ({
    empty,
    concat,
    [fl.empty]: empty,
    [fl.concat]: concat,
});
/* ============================================================
   VALUE-LEVEL MONOIDS (required by laws tests)
   Used as: const M = monoidString
============================================================ */
export const monoidString = makeMonoid("", (a, b) => a + b);
export const monoidSum = makeMonoid(0, (a, b) => a + b);
export const monoidArray = () => makeMonoid([], (xs, ys) => xs.concat(ys));
/* ============================================================
   FUNCTION VERSIONS (required by Writer tests)
   Used as: const M = monoidString()
============================================================ */
export const monoidStringFn = () => monoidString;
export const monoidSumFn = () => monoidSum;
/* ============================================================
   CONSTANT aliases (optional but harmless)
============================================================ */
export const MonoidString = monoidString;
export const MonoidSum = monoidSum;
/* ============================================================
   fold
============================================================ */
export const fold = (M) => (xs) => xs.reduce(M.concat, M.empty);
//# sourceMappingURL=monoid.js.map