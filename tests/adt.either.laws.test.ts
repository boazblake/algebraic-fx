// tests/adt.either.laws.test.ts
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { Either, left, right, map, ap, chain, of } from "@/adt/either";

type E = string;
type A = number;
type B = number;
type C = number;

const eqEither = (x: Either<E, A>, y: Either<E, A>): boolean => {
  if (x._tag !== y._tag) return false;
  if (x._tag === "Left" && y._tag === "Left") return Object.is(x.left, y.left);
  if (x._tag === "Right" && y._tag === "Right")
    return Object.is(x.right, y.right);
  return false;
};

const arbEither = fc.oneof<Either<E, A>>(
  fc.string().map((e) => left<E, A>(e)),
  fc.integer().map((n) => right<E, A>(n))
);

describe("Either laws", () => {
  describe("Functor", () => {
    it("identity", () => {
      fc.assert(
        fc.property(arbEither, (fa) => {
          const lhs = map(fa, (x) => x);
          const rhs = fa;
          return eqEither(lhs as any, rhs as any);
        })
      );
    });

    it("composition", () => {
      const f = (n: A): B => n + 1;
      const g = (n: B): C => n * 2;

      fc.assert(
        fc.property(arbEither, (fa) => {
          const lhs = map(map(fa, f), g);
          const rhs = map(fa, (x) => g(f(x)));
          return eqEither(lhs as any, rhs as any);
        })
      );
    });
  });

  describe("Applicative", () => {
    it("identity", () => {
      fc.assert(
        fc.property(arbEither, (fa) => {
          const id = of((x: A) => x);
          const lhs = ap(id as any, fa);
          const rhs = fa;
          return eqEither(lhs as any, rhs as any);
        })
      );
    });

    it("homomorphism", () => {
      const f = (n: A): B => n + 1;

      fc.assert(
        fc.property(fc.integer(), (x) => {
          const lhs = ap(of(f) as any, of(x));
          const rhs = of(f(x));
          return eqEither(lhs as any, rhs as any);
        })
      );
    });

    it("interchange", () => {
      fc.assert(
        fc.property(fc.integer(), fc.func(fc.integer()), (y, f) => {
          const u = of(f) as Either<E, (a: A) => B>;
          const lhs = ap(u, of(y));
          const rhs = ap(of((g: (a: A) => B) => g(y)) as any, u);
          return eqEither(lhs as any, rhs as any);
        })
      );
    });
  });

  describe("Monad", () => {
    it("left identity", () => {
      const f = (n: A): Either<E, B> => right<E, B>(n + 1);

      fc.assert(
        fc.property(fc.integer(), (a) => {
          const lhs = chain(of(a), f);
          const rhs = f(a);
          return eqEither(lhs as any, rhs as any);
        })
      );
    });

    it("right identity", () => {
      fc.assert(
        fc.property(arbEither, (fa) => {
          const lhs = chain(fa, of as any);
          const rhs = fa;
          return eqEither(lhs as any, rhs as any);
        })
      );
    });

    it("associativity", () => {
      const f = (n: A): Either<E, B> => right<E, B>(n + 1);
      const g = (n: B): Either<E, C> => right<E, C>(n * 2);

      fc.assert(
        fc.property(arbEither, (fa) => {
          const lhs = chain(chain(fa, f), g);
          const rhs = chain(fa, (x: A) => chain(f(x), g));
          return eqEither(lhs as any, rhs as any);
        })
      );
    });
  });
});
