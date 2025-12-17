// tests/adt.fl.test.ts
import { describe, it, expect } from "vitest";
import { fl } from "@/adt/fl";

describe("fl symbol registry", () => {
  it("uses stable Symbol.for keys", () => {
    expect(fl.map).toBe(Symbol.for("fantasy-land/map"));
    expect(fl.ap).toBe(Symbol.for("fantasy-land/ap"));
    expect(fl.of).toBe(Symbol.for("fantasy-land/of"));
    expect(fl.chain).toBe(Symbol.for("fantasy-land/chain"));
    expect(fl.bimap).toBe(Symbol.for("fantasy-land/bimap"));
  });

  it("symbols are all distinct", () => {
    const values = [fl.map, fl.ap, fl.of, fl.chain, fl.bimap];
    const set = new Set(values);
    expect(set.size).toBe(values.length);
  });
});
