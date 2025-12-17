// tests/adt.writer.laws.test.ts
import { describe, it, expect } from "vitest";
import { monoidString } from "../src/adt/monoid";
import { of, WriterModule, type Writer } from "../src/adt/writer";
import { fl } from "../src/adt/fl";

type WriterS<A> = Writer<string, A>;

const M = monoidString;
const W = WriterModule(M);

const ofS = <A>(a: A, log?: string): WriterS<A> => of(M, a, log ?? "");

const eqWriter = <A>(wa: WriterS<A>, wb: WriterS<A>): boolean => {
  const [va, la] = wa.run();
  const [vb, lb] = wb.run();
  return va === vb && la === lb;
};

describe("Writer laws", () => {
  it("Functor identity", () => {
    const x = ofS(1);
    const lhs = W.map(x, (a) => a);
    const rhs = x;
    expect(eqWriter(lhs, rhs)).toBe(true);
  });

  it("Functor composition", () => {
    const x = ofS(1);
    const f = (n: number) => n + 1;
    const g = (n: number) => n * 2;

    const lhs = W.map(x, (a) => g(f(a)));
    const rhs = W.map(W.map(x, f), g);

    expect(eqWriter(lhs, rhs)).toBe(true);
  });

  it("Monad left identity", () => {
    const a = 1;
    const f = (n: number) => ofS(n + 1);

    const lhs = W.chain(ofS(a), f);
    const rhs = f(a);

    expect(eqWriter(lhs, rhs)).toBe(true);
  });

  it("Monad right identity", () => {
    const x = ofS(1);
    const lhs = W.chain(x, ofS);
    const rhs = x;
    expect(eqWriter(lhs, rhs)).toBe(true);
  });

  it("Monad associativity", () => {
    const x = ofS(1);
    const f = (n: number) => ofS(n + 1);
    const g = (n: number) => ofS(n * 2);

    const lhs = W.chain(W.chain(x, f), g);
    const rhs = W.chain(x, (n) => W.chain(f(n), g));

    expect(eqWriter(lhs, rhs)).toBe(true);
  });

  it("module FL.map and FL.chain behave like map and chain", () => {
    const M = monoidString;
    const W = WriterModule(M);

    const x = W.of("x");

    const mapped = W.map(x, (s) => s + "1");
    const chained = W.chain(x, (s) => W.of(s + "1"));

    const viaFl = x as any;

    const mappedFl = viaFl[fl.map]((s: string) => s + "1");
    const chainedFl = viaFl[fl.chain]((s: string) => W.of(s + "1"));

    expect(eqWriter(mapped, mappedFl)).toBe(true);
    expect(eqWriter(chained, chainedFl)).toBe(true);
  });
});
