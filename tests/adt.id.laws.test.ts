// tests/adt.id.laws.test.ts
import { describe, it } from "vitest";
import fc from "fast-check";
import { of, map, chain } from "@/adt/id";
import type { ID } from "@/adt/id";

// helper to compare ID values
const eq = <A>(x: ID<A>, y: ID<A>) => Object.is(x.run(), y.run());

describe("ID laws", () => {
  describe("Functor", () => {
    it("identity", () => {
      fc.assert(
        fc.property(fc.integer(), (n) => {
          const fa = of(n);
          const lhs = map((x: number) => x)(fa);
          const rhs = fa;
          return eq(lhs, rhs);
        })
      );
    });

    it("composition", () => {
      const f = (n: number) => n + 1;
      const g = (n: number) => n * 2;

      fc.assert(
        fc.property(fc.integer(), (n) => {
          const fa = of(n);
          const lhs = map((x: number) => f(g(x)))(fa);
          const rhs = map(f)(map(g)(fa));
          return eq(lhs, rhs);
        })
      );
    });
  });

  describe("Monad", () => {
    it("left identity", () => {
      const f = (n: number) => of(n + 1);

      fc.assert(
        fc.property(fc.integer(), (a) => {
          const lhs = chain(f)(of(a));
          const rhs = f(a);
          return eq(lhs, rhs);
        })
      );
    });

    it("right identity", () => {
      fc.assert(
        fc.property(fc.integer(), (a) => {
          const m = of(a);
          const lhs = chain(of)(m);
          const rhs = m;
          return eq(lhs, rhs);
        })
      );
    });

    it("associativity", () => {
      const f = (n: number) => of(n + 1);
      const g = (n: number) => of(n * 2);

      fc.assert(
        fc.property(fc.integer(), (a) => {
          const m = of(a);
          const lhs = chain(g)(chain(f)(m));
          const rhs = chain((x: number) => chain(g)(f(x)))(m);
          return eq(lhs, rhs);
        })
      );
    });
  });
});
