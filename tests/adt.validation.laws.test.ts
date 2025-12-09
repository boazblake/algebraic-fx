import { describe, it, expect } from "vitest";
import fc from "fast-check";
import ValidationModule, {
  Success,
  Failure,
  type Validation as V,
} from "../src/adt/validation.ts";

const { map, ap, of } = ValidationModule;

// Arbitrary Validation<string, number>
const arbValidation: fc.Arbitrary<V<string, number>> = fc.oneof(
  fc.integer().map((n) => Success(n)),
  fc.array(fc.string(), { minLength: 1 }).map((errs) => Failure(errs))
);

const eqValidation = (
  v1: V<string, number>,
  v2: V<string, number>
): boolean => {
  if (v1._tag !== v2._tag) return false;
  if (v1._tag === "Success") return v1.value === v2.value;
  return JSON.stringify(v1.errors) === JSON.stringify(v2.errors);
};

describe("Validation laws (fast-check)", () => {
  it("Functor identity", () => {
    fc.assert(
      fc.property(arbValidation, (fa) => {
        const id = (x: number) => x;
        expect(eqValidation(map(id, fa), fa)).toBe(true);
      })
    );
  });

  it("Functor composition", () => {
    fc.assert(
      fc.property(
        arbValidation,
        fc.func(fc.integer()),
        fc.func(fc.integer()),
        (fa, f, g) => {
          const lhs = map((x) => f(g(x)), fa);
          const rhs = map(f, map(g, fa));
          expect(eqValidation(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Applicative identity", () => {
    fc.assert(
      fc.property(arbValidation, (fa) => {
        const pureId = of<string, (x: number) => number>((x) => x);
        const lhs = ap(pureId, fa);
        expect(eqValidation(lhs, fa)).toBe(true);
      })
    );
  });

  it("Applicative homomorphism", () => {
    fc.assert(
      fc.property(fc.integer(), fc.func(fc.integer()), (x, f) => {
        const lhs = ap(of<string, typeof f>(f), of<string, number>(x));
        const rhs = of<string, number>(f(x));
        expect(eqValidation(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Applicative failure accumulation", () => {
    fc.assert(
      fc.property(
        fc.array(fc.string(), { minLength: 1 }),
        fc.array(fc.string(), { minLength: 1 }),
        (errs1, errs2) => {
          const f = Failure<string, (n: number) => number>(errs1);
          const x = Failure<string, number>(errs2);

          const combined = ap(f, x);
          expect(combined._tag).toBe("Failure");
          // Semigroup accumulation
          expect(combined.errors).toEqual([...errs1, ...errs2]);
        }
      )
    );
  });
});
