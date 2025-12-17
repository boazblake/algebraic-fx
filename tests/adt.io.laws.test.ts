// tests/adt.io.laws.test.ts
import { describe, it, expect } from "vitest";
import { IO, of, map, chain, ap } from "@/adt/io";

const eqIO = <A>(x: IO<A>, y: IO<A>): boolean => x.run() === y.run();

const id = <A>(a: A): A => a;

describe("IO laws", () => {
  describe("Functor", () => {
    it("identity", () => {
      const fa = of(10);
      const left = map(id)(fa);
      const right = fa;
      expect(eqIO(left, right)).toBe(true);
    });

    it("composition", () => {
      const fa = of(5);
      const f = (n: number) => n + 1;
      const g = (n: number) => n * 2;

      const left = map((x: number) => f(g(x)))(fa);
      const right = map(f)(map(g)(fa));

      expect(eqIO(left, right)).toBe(true);
    });
  });

  describe("Applicative", () => {
    it("identity", () => {
      const v = of(7);
      const u = of((x: number) => x);

      const left = ap(u)(v);
      const right = v;

      expect(eqIO(left, right)).toBe(true);
    });

    it("homomorphism", () => {
      const f = (n: number) => n * 3;
      const x = 4;

      const left = ap(of(f))(of(x));
      const right = of(f(x));

      expect(eqIO(left, right)).toBe(true);
    });

    it("interchange", () => {
      const y = 3;
      const u = of((n: number) => n + 2);

      const left = ap(u)(of(y));
      const right = ap(of((f: (n: number) => number) => f(y)))(u);

      expect(eqIO(left, right)).toBe(true);
    });
  });

  describe("Monad", () => {
    it("left identity", () => {
      const a = 5;
      const f = (n: number) => of(n * 2);

      const left = chain(f)(of(a));
      const right = f(a);

      expect(eqIO(left, right)).toBe(true);
    });

    it("right identity", () => {
      const m = of(9);

      const left = chain(of)(m);
      const right = m;

      expect(eqIO(left, right)).toBe(true);
    });

    it("associativity", () => {
      const m = of(2);
      const f = (n: number) => of(n + 3);
      const g = (n: number) => of(n * 10);

      const left = chain(g)(chain(f)(m));
      const right = chain((x: number) => chain(g)(f(x)))(m);

      expect(eqIO(left, right)).toBe(true);
    });
  });
});
