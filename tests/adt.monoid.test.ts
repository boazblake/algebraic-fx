// tests/adt.monoid.test.ts
import { describe, it, expect } from "vitest";
import { monoidArray, monoidString, monoidSum, fold } from "@/adt/monoid";

describe("Monoid instances", () => {
  it("monoidArray satisfies identity", () => {
    const M = monoidArray<string>();
    const xs: string[] = ["a", "b"];
    expect(M.concat(M.empty, xs)).toEqual(xs);
    expect(M.concat(xs, M.empty)).toEqual(xs);
  });

  it("monoidString satisfies identity", () => {
    const M = monoidString;
    expect(M.concat(M.empty, "abc")).toBe("abc");
    expect(M.concat("abc", M.empty)).toBe("abc");
  });

  it("monoidSum satisfies identity", () => {
    const M = monoidSum;
    expect(M.concat(M.empty, 5)).toBe(5);
    expect(M.concat(5, M.empty)).toBe(5);
  });

  it("fold works", () => {
    expect(fold(monoidSum)([1, 2, 3])).toBe(6);
    expect(fold(monoidString)(["a", "b", "c"])).toBe("abc");
    expect(fold(monoidArray<number>())([[1], [2], [3]])).toEqual([1, 2, 3]);
  });
});
