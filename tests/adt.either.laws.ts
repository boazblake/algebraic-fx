// tests/adt.either.laws.test.ts
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import EitherModule, {
  Left,
  Right,
  type Either as EitherT,
} from "../src/adt/either.js";

const { map, chain, of, bimap, mapLeft } = EitherModule;

type E = string;
type A = number;

// Arbitrary Either<string, number>
const arbEither: fc.Arbitrary<EitherT<E, A>> = fc.oneof(
  fc.string().map((s) => Left<E>(s)),
  fc.integer().map((n) => Right<A>(n))
);

const eqEither = (x: EitherT<E, A>, y: EitherT<E, A>): boolean => {
  if (x._tag === "Left" && y._tag === "Left") return x.left === y.left;
  if (x._tag === "Right" && y._tag === "Right") return x.right === y.right;
  return false;
};

describe("Either laws (fast-check)", () => {
  it("Functor identity", () => {
    fc.assert(
      fc.property(arbEither, (fa) => {
        const id = (x: A): A => x;
        const lhs = map<E, A, A>(id, fa);
        const rhs = fa;
        expect(eqEither(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Functor composition", () => {
    fc.assert(
      fc.property(
        arbEither,
        fc.func<A, A>(fc.integer()),
        fc.func<A, A>(fc.integer()),
        (fa, f, g) => {
          const compose = (x: A): A => f(g(x));
          const lhs = map<E, A, A>(compose, fa);
          const rhs = map<E, A, A>(f, map<E, A, A>(g, fa));
          expect(eqEither(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Monad left identity", () => {
    fc.assert(
      fc.property(
        fc.integer(),
        fc.func<A, EitherT<E, A>>(arbEither as fc.Arbitrary<EitherT<E, A>>),
        (a, f) => {
          const lhs = chain<E, A, A>(f, of(a));
          const rhs = f(a);
          expect(eqEither(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Monad right identity", () => {
    fc.assert(
      fc.property(arbEither, (fa) => {
        const lhs = chain<E, A, A>(of, fa);
        const rhs = fa;
        expect(eqEither(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Monad associativity", () => {
    fc.assert(
      fc.property(
        arbEither,
        fc.func<A, EitherT<E, A>>(arbEither as fc.Arbitrary<EitherT<E, A>>),
        fc.func<A, EitherT<E, A>>(arbEither as fc.Arbitrary<EitherT<E, A>>),
        (fa, f, g) => {
          const lhs = chain<E, A, A>(g, chain<E, A, A>(f, fa));
          const rhs = chain<E, A, A>((a) => chain<E, A, A>(g, f(a)), fa);
          expect(eqEither(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Bifunctor identity (bimap(id,id) = id)", () => {
    fc.assert(
      fc.property(arbEither, (eab) => {
        const idE = (e: E): E => e;
        const idA = (a: A): A => a;
        const lhs = bimap<E, A, E, A>(idE, idA, eab);
        const rhs = eab;
        expect(eqEither(lhs, rhs)).toBe(true);
      })
    );
  });

  it("mapLeft agrees with bimap(onLeft, id)", () => {
    fc.assert(
      fc.property(arbEither, fc.func<E, E>(fc.string()), (eab, f) => {
        const idA = (a: A): A => a;
        const viaMapLeft = mapLeft<E, A, E>(f, eab);
        const viaBimap = bimap<E, A, E, A>(f, idA, eab);
        expect(eqEither(viaMapLeft as EitherT<E, A>, viaBimap)).toBe(true);
      })
    );
  });
});
