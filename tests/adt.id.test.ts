// tests/adt.id.test.ts
import { describe, it, expect } from "vitest";
import { of, map, chain, ap, isID, IDModule } from "@/adt/id";
import { fl } from "@/adt/fl";

describe("ID", () => {
  it("wraps and unwraps values", () => {
    const x = of(42);
    expect(x.value).toBe(42);
    expect(x.run()).toBe(42);
  });

  it("map applies function", () => {
    const x = map((n: number) => n * 3)(of(2));
    expect(x.run()).toBe(6);
  });

  it("chain sequences computations", () => {
    const x = chain((n: number) => of(n + 5))(of(2));
    expect(x.run()).toBe(7);
  });

  it("FL methods match named methods", () => {
    const id = of(10);
    const f = (n: number) => n + 1;

    const a = id.map(f).run();
    const b = (id as any)[fl.map](f).run();

    expect(a).toBe(b);
  });

  it("isID detects ID values", () => {
    expect(isID(of(1))).toBe(true);
    expect(isID(123)).toBe(false);
  });

  it("IDModule exposes fp-ts dictionary and FL.of", () => {
    const viaDict = IDModule.of(5);
    expect(viaDict.run()).toBe(5);

    const viaFl = IDModule[fl.of]!(5);
    expect(viaFl.run()).toBe(5);
  });
});
