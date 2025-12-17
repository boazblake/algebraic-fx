import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { StateModule } from "@/adt/state";
import type { State } from "@/adt/state";

const eqState = <S, A>(sa: State<S, A>, sb: State<S, A>, init: S): boolean => {
  const [va, sa1] = sa.run(init);
  const [vb, sb1] = sb.run(init);
  return Object.is(va, vb) && Object.is(sa1, sb1);
};

describe("State laws", () => {
  const { of, map, chain, ap } = StateModule;

  describe("Functor", () => {
    it("identity", () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (seed, init) => {
          const s = of<number, number>(seed);
          const left = map<number, number, number>((x) => x)(s);
          const right = s;
          return eqState(left, right, init);
        })
      );
    });

    it("composition", () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (seed, init) => {
          const s = of<number, number>(seed);
          const f = (x: number) => x + 1;
          const g = (x: number) => x * 2;

          const left = map<number, number, number>(g)(
            map<number, number, number>(f)(s)
          );
          const right = map<number, number, number>((x) => g(f(x)))(s);

          return eqState(left, right, init);
        })
      );
    });
  });

  describe("Applicative", () => {
    it("identity", () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (seed, init) => {
          const v = of<number, number>(seed);
          const id = of<number, (x: number) => number>((x) => x);
          const left = ap<number, number, number>(id)(v);
          const right = v;
          return eqState(left, right, init);
        })
      );
    });

    it("homomorphism", () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (x, init) => {
          const f = (n: number) => n + 2;

          const left = ap<number, number, number>(
            of<number, (n: number) => number>(f)
          )(of<number, number>(x));

          const right = of<number, number>(f(x));

          return eqState(left, right, init);
        })
      );
    });

    it("interchange", () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (y, init) => {
          const u = of<number, (n: number) => number>((n) => n * 3);

          const left = ap<number, number, number>(u)(of<number, number>(y));
          const right = ap<number, (n: number) => number, number>(
            of<number, (f: (n: number) => number) => number>((f) => f(y))
          )(u);

          return eqState(left, right, init);
        })
      );
    });
  });

  describe("Monad", () => {
    const f = (x: number) => of<number, number>(x + 1);
    const g = (x: number) => of<number, number>(x * 2);

    it("left identity", () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (a, init) => {
          const left = chain<number, number, number>(f)(of<number, number>(a));
          const right = f(a);
          return eqState(left, right, init);
        })
      );
    });

    it("right identity", () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (seed, init) => {
          const m = of<number, number>(seed);
          const left = chain<number, number, number>(of)(m);
          const right = m;
          return eqState(left, right, init);
        })
      );
    });

    it("associativity", () => {
      fc.assert(
        fc.property(fc.integer(), fc.integer(), (seed, init) => {
          const m = of<number, number>(seed);

          const left = chain<number, number, number>(g)(
            chain<number, number, number>(f)(m)
          );

          const right = chain<number, number, number>((x) =>
            chain<number, number, number>(g)(f(x))
          )(m);

          return eqState(left, right, init);
        })
      );
    });
  });
});
