// tests/adt.writer.laws.test.ts
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import WriterModule, { type Writer as WriterT } from "../src/adt/writer.js";

const Writer = WriterModule;

// Monoid instance for W = string[]
const emptyLog: string[] = [];
const combineLog = (w1: string[], w2: string[]): string[] => [...w1, ...w2];

const of = <A>(a: A): WriterT<string[], A> =>
  Writer.of<string[], A>(a, emptyLog, combineLog);

const tell = (msg: string): WriterT<string[], void> =>
  Writer.tell<string[]>([msg], emptyLog, combineLog);

// Arbitrary Writer<string[], number>
const arbWriterNumber: fc.Arbitrary<WriterT<string[], number>> = fc
  .tuple(fc.integer(), fc.array(fc.string()))
  .map(([n, logs]) => Writer.of<string[], number>(n, logs, combineLog));

const eqWriter = (
  w1: WriterT<string[], number>,
  w2: WriterT<string[], number>
): boolean => {
  const [v1, l1] = w1.run();
  const [v2, l2] = w2.run();
  return v1 === v2 && JSON.stringify(l1) === JSON.stringify(l2);
};

describe("Writer laws (fast-check)", () => {
  it("Monoid associativity for log", () => {
    fc.assert(
      fc.property(
        fc.array(fc.string()),
        fc.array(fc.string()),
        fc.array(fc.string()),
        (a, b, c) => {
          const ab_c = combineLog(combineLog(a, b), c);
          const a_bc = combineLog(a, combineLog(b, c));
          expect(ab_c).toEqual(a_bc);
        }
      )
    );
  });

  it("Monoid identity for log", () => {
    fc.assert(
      fc.property(fc.array(fc.string()), (w) => {
        expect(combineLog(emptyLog, w)).toEqual(w);
        expect(combineLog(w, emptyLog)).toEqual(w);
      })
    );
  });

  it("Functor identity", () => {
    fc.assert(
      fc.property(arbWriterNumber, (fa) => {
        const id = (x: number): number => x;
        const lhs = fa.map(id);
        const rhs = fa;
        expect(eqWriter(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Functor composition", () => {
    fc.assert(
      fc.property(
        arbWriterNumber,
        fc.func<number, number>(fc.integer()),
        fc.func<number, number>(fc.integer()),
        (fa, f, g) => {
          const compose = (x: number): number => f(g(x));
          const lhs = fa.map(compose);
          const rhs = fa.map(g).map(f);
          expect(eqWriter(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Monad left identity", () => {
    fc.assert(
      fc.property(
        fc.integer(),
        fc.func<number, WriterT<string[], number>>(arbWriterNumber),
        (a, f) => {
          const lhs = of(a).chain(f);
          const rhs = f(a);
          expect(eqWriter(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("Monad right identity", () => {
    fc.assert(
      fc.property(arbWriterNumber, (fa) => {
        const lhs = fa.chain(of);
        const rhs = fa;
        expect(eqWriter(lhs, rhs)).toBe(true);
      })
    );
  });

  it("Monad associativity", () => {
    fc.assert(
      fc.property(
        arbWriterNumber,
        fc.func<number, WriterT<string[], number>>(arbWriterNumber),
        fc.func<number, WriterT<string[], number>>(arbWriterNumber),
        (fa, f, g) => {
          const lhs = fa.chain(f).chain(g);
          const rhs = fa.chain((a) => f(a).chain(g));
          expect(eqWriter(lhs, rhs)).toBe(true);
        }
      )
    );
  });

  it("tell accumulates logs with of", () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (a, b) => {
        const w = tell(a)
          .chain(() => tell(b))
          .chain(() => of(1));

        const [val, logs] = w.run();
        expect(val).toBe(1);
        expect(logs).toEqual([a, b]); // Correct expectation
      })
    );
  });
});
