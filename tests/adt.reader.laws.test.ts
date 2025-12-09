import { describe, it, expect } from "vitest";
import fc from "fast-check";
import ReaderModule from "../src/adt/reader.js";

const Reader = ReaderModule;

/**
 * Arbitrary Reader<number, number> — represented as (env) => env + k
 */
const arbReaderNum: fc.Arbitrary<ReturnType<typeof Reader<number, number>>> = fc
  .integer()
  .map((k) => Reader<number, number>((env) => env + k));

/**
 * Equality helper: compare Reader by running them on many env values.
 */
const eqReader = (
  r1: ReturnType<typeof Reader<any, any>>,
  r2: ReturnType<typeof Reader<any, any>>
): boolean => {
  for (let env = -5; env <= 5; env++) {
    if (r1.run(env) !== r2.run(env)) return false;
  }
  return true;
};

describe("Reader laws (fast-check)", () => {
  it("Functor identity", () => {
    fc.assert(
      fc.property(arbReaderNum, (fa) => {
        const id = (x: number) => x;
        expect(eqReader(fa.map(id), fa)).toBe(true);
      })
    );
  });

  it("Functor composition", () => {
    fc.assert(
      fc.property(
        arbReaderNum,
        fc.func(fc.integer()),
        fc.func(fc.integer()),
        (fa, f, g) => {
          const lhs = fa.map((x) => f(g(x)));
          const rhs = fa.map(g).map(f);
          expect(eqReader(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Applicative identity", () => {
    fc.assert(
      fc.property(arbReaderNum, (fa) => {
        const pureId = Reader.of<number, (x: number) => number>((x) => x);
        expect(eqReader(fa.ap(pureId), fa)).toBe(true);
      })
    );
  });

  it("Applicative homomorphism", () => {
    fc.assert(
      fc.property(fc.integer(), fc.func(fc.integer()), (x, f) => {
        const lhs = Reader.of<number, number>(x).map(f);
        const rhs = Reader.of<number, number>(f(x));
        expect(eqReader(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Monad left identity", () => {
    fc.assert(
      fc.property(fc.integer(), fc.func(arbReaderNum), (a, f) => {
        const lhs = Reader.of<number, number>(a).chain(f);
        const rhs = f(a);
        expect(eqReader(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Monad right identity", () => {
    fc.assert(
      fc.property(arbReaderNum, (fa) => {
        const lhs = fa.chain(Reader.of);
        const rhs = fa;
        expect(eqReader(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Monad associativity", () => {
    fc.assert(
      fc.property(
        arbReaderNum,
        fc.func(arbReaderNum),
        fc.func(arbReaderNum),
        (fa, f, g) => {
          const lhs = fa.chain(f).chain(g);
          const rhs = fa.chain((x) => f(x).chain(g));
          expect(eqReader(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("ask returns the environment", () => {
    const ask = Reader.ask<number>();
    for (let env = -5; env <= 5; env++) {
      expect(ask.run(env)).toBe(env);
    }
  });

  it("local modifies environment before passing to Reader", () => {
    const r = Reader.ask<number>().map((x) => x * 2);
    const adjusted = Reader.local((x: number) => x + 1)(r);

    expect(r.run(3)).toBe(6);
    expect(adjusted.run(3)).toBe(8); // (3+1)*2 = 8
  });
});
