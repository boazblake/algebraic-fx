// tests/adt.maybe.laws.test.ts
import { describe, it } from "vitest";
import fc from "fast-check";
import {
  just,
  nothing,
  MaybeModule,
  MaybeModule as M,
  isJust,
  Maybe,
} from "@/adt/maybe";

const eqMaybe = <A>(x: Maybe<A>, y: Maybe<A>): boolean => {
  if (!isJust(x) && !isJust(y)) return true;
  if (isJust(x) && isJust(y)) return x.value === y.value;
  return false;
};

const arbMaybe = <A>(arbA: fc.Arbitrary<A>): fc.Arbitrary<Maybe<A>> =>
  fc.oneof(
    arbA.map((a) => just(a)),
    fc.constant(nothing as Maybe<A>)
  );

describe("Maybe laws", () => {
  // Functor laws
  it("Functor identity", () => {
    fc.assert(
      fc.property(arbMaybe(fc.integer()), (ma) => {
        const id = <A>(x: A): A => x;
        const left = M.map(id)(ma);
        const right = ma;
        return eqMaybe(left, right);
      })
    );
  });

  it("Functor composition", () => {
    fc.assert(
      fc.property(arbMaybe(fc.integer()), (ma) => {
        const f = (n: number) => n + 1;
        const g = (n: number) => n * 2;

        const left = M.map((x: number) => f(g(x)))(ma);
        const right = M.map(f)(M.map(g)(ma));

        return eqMaybe(left, right);
      })
    );
  });

  // Applicative laws
  it("Applicative identity", () => {
    fc.assert(
      fc.property(arbMaybe(fc.integer()), (ma) => {
        const id = <A>(x: A): A => x;
        const u = M.of(id as (x: number) => number);
        const left = M.ap(u)(ma);
        const right = ma;

        return eqMaybe(left, right);
      })
    );
  });

  it("Applicative homomorphism", () => {
    fc.assert(
      fc.property(fc.integer(), (x) => {
        const f = (n: number) => n + 1;

        const left = M.ap(M.of(f))(M.of(x));
        const right = M.of(f(x));

        return eqMaybe(left, right);
      })
    );
  });

  it("Applicative interchange", () => {
    fc.assert(
      fc.property(fc.integer(), (y) => {
        const f = (n: number) => n + 1;
        const u = M.of(f);

        const left = M.ap(u)(M.of(y));
        const right = M.ap(M.of((g: (n: number) => number) => g(y)))(u);

        return eqMaybe(left, right);
      })
    );
  });

  // Monad laws
  it("Monad left identity", () => {
    fc.assert(
      fc.property(fc.integer(), (a) => {
        const f = (n: number) => M.of(n + 1);
        const left = M.chain(f)(M.of(a));
        const right = f(a);

        return eqMaybe(left, right);
      })
    );
  });

  it("Monad right identity", () => {
    fc.assert(
      fc.property(arbMaybe(fc.integer()), (ma) => {
        const left = M.chain(M.of)(ma);
        const right = ma;

        return eqMaybe(left, right);
      })
    );
  });

  it("Monad associativity", () => {
    fc.assert(
      fc.property(arbMaybe(fc.integer()), (ma) => {
        const f = (n: number) => M.of(n + 1);
        const g = (n: number) => M.of(n * 2);

        const left = M.chain(g)(M.chain(f)(ma));
        const right = M.chain((x: number) => M.chain(g)(f(x)))(ma);

        return eqMaybe(left, right);
      })
    );
  });
});
