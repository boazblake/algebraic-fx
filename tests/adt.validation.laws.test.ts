// tests/adt.validation.laws.test.ts
import { describe, it } from "vitest";
import fc from "fast-check";
import {
  Validation,
  failure,
  success,
  map,
  getValidationApplicative,
  semigroupString,
} from "@/adt/validation";

const eqValidation = <E, A>(
  x: Validation<E, A>,
  y: Validation<E, A>
): boolean => {
  if (x._tag !== y._tag) return false;
  if (x._tag === "Failure" && y._tag === "Failure") {
    return Object.is(x.left, (y as any).left);
  }
  if (x._tag === "Success" && y._tag === "Success") {
    return Object.is((x as any).right, (y as any).right);
  }
  return false;
};

const arbValidation = fc.oneof<Validation<string, number>>(
  fc.string().map((e) => failure<string, number>(e)),
  fc.integer().map((n) => success<string, number>(n))
);

describe("Validation laws", () => {
  // Functor

  it("Functor identity", () => {
    fc.assert(
      fc.property(arbValidation, (fa) => {
        const id = <T>(x: T): T => x;
        const r = map<number, number>(id)<string>(fa);
        return eqValidation(fa, r);
      })
    );
  });

  it("Functor composition", () => {
    fc.assert(
      fc.property(arbValidation, (fa) => {
        const f = (n: number): number => n + 1;
        const g = (n: number): number => n * 2;

        const left = map<number, number>((x) => f(g(x)))<string>(fa);
        const right = map<number, number>(f)<string>(
          map<number, number>(g)<string>(fa)
        );

        return eqValidation(left, right);
      })
    );
  });

  // Applicative with semigroupString

  it("Applicative identity", () => {
    const A = getValidationApplicative<string>(semigroupString);

    fc.assert(
      fc.property(arbValidation, (fa) => {
        const id = (x: number): number => x;
        const vId = success<string, (n: number) => number>(id);
        const r = A.ap(vId, fa);
        return eqValidation(fa, r);
      })
    );
  });

  it("Applicative homomorphism", () => {
    const A = getValidationApplicative<string>(semigroupString);

    fc.assert(
      fc.property(fc.integer(), (x) => {
        const f = (n: number): number => n * 2;

        const left = A.ap(
          success<string, (n: number) => number>(f),
          success<string, number>(x)
        );
        const right = success<string, number>(f(x));

        return eqValidation(left, right);
      })
    );
  });

  it("Applicative interchange", () => {
    const A = getValidationApplicative<string>(semigroupString);

    fc.assert(
      fc.property(fc.integer(), (y) => {
        const fab = success<string, (n: number) => number>((n) => n + 1);

        const left = A.ap(fab, success<string, number>(y));

        const u = (
          f: (n: number) => number
        ): Validation<string, (ignored: unknown) => number> =>
          success<string, (ignored: unknown) => number>(() => f(y));

        const right = A.ap(
          u((fab as any).right),
          success<string, unknown>(undefined)
        );

        // Compare by applying both to y in Success case, or same Failure
        if (left._tag === "Failure" && right._tag === "Failure") {
          return Object.is(left.left, right.left);
        }
        if (left._tag === "Success" && right._tag === "Success") {
          const lv = left.right;
          const rv = right.right as any; // no call
          return Object.is(lv, rv);
        }
        return false;
      })
    );
  });
});
