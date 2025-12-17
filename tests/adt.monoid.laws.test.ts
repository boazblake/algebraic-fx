// tests/adt.monoid.laws.test.ts
import { describe, it } from "vitest";
import fc from "fast-check";
import {
  monoidArray,
  monoidString,
  monoidSum,
  type Monoid,
} from "@/adt/monoid";

const eq = (a: any, b: any): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!eq(a[i], b[i])) return false;
    return true;
  }
  return Object.is(a, b);
};

/* helper: check laws */
const assoc = <A>(M: Monoid<A>, a: A, b: A, c: A) =>
  eq(M.concat(a, M.concat(b, c)), M.concat(M.concat(a, b), c));

const leftId = <A>(M: Monoid<A>, a: A) => eq(M.concat(M.empty, a), a);

const rightId = <A>(M: Monoid<A>, a: A) => eq(M.concat(a, M.empty), a);

describe("Monoid Laws", () => {
  it("array<string>", () => {
    const M = monoidArray<string>();

    fc.assert(
      fc.property(
        fc.array(fc.string()),
        fc.array(fc.string()),
        fc.array(fc.string()),
        (a, b, c) => assoc(M, a, b, c)
      )
    );

    fc.assert(fc.property(fc.array(fc.string()), (a) => leftId(M, a)));

    fc.assert(fc.property(fc.array(fc.string()), (a) => rightId(M, a)));
  });

  it("string", () => {
    const M = monoidString;

    fc.assert(
      fc.property(fc.string(), fc.string(), fc.string(), (a, b, c) =>
        assoc(M, a, b, c)
      )
    );

    fc.assert(fc.property(fc.string(), (a) => leftId(M, a)));

    fc.assert(fc.property(fc.string(), (a) => rightId(M, a)));
  });

  it("sum", () => {
    const M = monoidSum;

    fc.assert(
      fc.property(fc.integer(), fc.integer(), fc.integer(), (a, b, c) =>
        assoc(M, a, b, c)
      )
    );

    fc.assert(fc.property(fc.integer(), (a) => leftId(M, a)));

    fc.assert(fc.property(fc.integer(), (a) => rightId(M, a)));
  });
});
