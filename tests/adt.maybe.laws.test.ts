import { describe, it, expect } from "vitest";
import fc from "fast-check";
import MaybeModule, {
  Just,
  Nothing,
  type Maybe as MaybeT,
} from "../src/adt/maybe.js";

const { map, chain, of, fromNullable, toNullable } = MaybeModule;

// Arbitrary for Maybe<number>
const arbMaybeNumber: fc.Arbitrary<MaybeT<number>> = fc.oneof(
  fc.constant(Nothing),
  fc.integer().map((n) => Just(n))
);

// Helper: equality on Maybe<number>
const eqMaybeNumber = (a: MaybeT<number>, b: MaybeT<number>): boolean => {
  if (a._tag === "Nothing" && b._tag === "Nothing") return true;
  if (a._tag === "Just" && b._tag === "Just") return a.value === b.value;
  return false;
};

describe("Maybe laws (fast-check)", () => {
  // Functor identity: map(id, fa) = fa
  it("Functor identity", () => {
    fc.assert(
      fc.property(arbMaybeNumber, (fa) => {
        const id = (x: number): number => x;
        const lhs = map(id, fa);
        const rhs = fa;
        expect(eqMaybeNumber(lhs, rhs)).toBe(true);
      })
    );
  });

  // Functor composition: map(f ∘ g) = map(f) ∘ map(g)
  it("Functor composition", () => {
    fc.assert(
      fc.property(
        arbMaybeNumber,
        fc.func<number, number>(fc.integer()),
        fc.func<number, number>(fc.integer()),
        (fa, f, g) => {
          const compose = (x: number): number => f(g(x));
          const lhs = map(compose, fa);
          const rhs = map(f, map(g, fa));
          expect(eqMaybeNumber(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  // Monad left identity: chain(f, of(a)) = f(a)
  it("Monad left identity", () => {
    fc.assert(
      fc.property(
        fc.integer(),
        fc.func<number, MaybeT<number>>(
          arbMaybeNumber as fc.Arbitrary<MaybeT<number>>
        ),
        (a, f) => {
          const lhs = chain(f, of(a));
          const rhs = f(a);
          expect(eqMaybeNumber(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  // Monad right identity: chain(of, fa) = fa
  it("Monad right identity", () => {
    fc.assert(
      fc.property(arbMaybeNumber, (fa) => {
        const lhs = chain(of, fa);
        const rhs = fa;
        expect(eqMaybeNumber(lhs, rhs)).toBe(true);
      })
    );
  });

  // Monad associativity: chain(g, chain(f, fa)) = chain(a => chain(g, f(a)), fa)
  it("Monad associativity", () => {
    fc.assert(
      fc.property(
        arbMaybeNumber,
        fc.func<number, MaybeT<number>>(
          arbMaybeNumber as fc.Arbitrary<MaybeT<number>>
        ),
        fc.func<number, MaybeT<number>>(
          arbMaybeNumber as fc.Arbitrary<MaybeT<number>>
        ),
        (fa, f, g) => {
          const lhs = chain(g, chain(f, fa));
          const rhs = chain((a: number) => chain(g, f(a)), fa);
          expect(eqMaybeNumber(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  // fromNullable/toNullable round-trip (partial)
  it("fromNullable/toNullable round-trip", () => {
    fc.assert(
      fc.property(fc.option(fc.integer(), { nil: null }), (n) => {
        const m = fromNullable(n);
        const back = toNullable(m);
        if (n == null) {
          expect(back).toBeNull();
        } else {
          expect(back).toBe(n);
        }
      })
    );
  });
});
