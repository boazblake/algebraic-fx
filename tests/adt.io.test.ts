import { describe, it, expect } from "vitest";
import { IO } from "../src/adt/io.js";

describe("IO", () => {
  it("wraps and runs side effects lazily", () => {
    let n = 0;
    const inc = IO(() => {
      n += 1;
      return n;
    });

    expect(n).toBe(0);
    const r1 = inc.run();
    expect(r1).toBe(1);
    expect(n).toBe(1);
    const r2 = inc.run();
    expect(r2).toBe(2);
    expect(n).toBe(2);
  });

  it("supports map", () => {
    const io = IO(() => 2);
    const mapped = io.map((x) => x + 1);

    expect(mapped.run()).toBe(3);
  });

  it("supports chain", () => {
    const io = IO(() => 2);
    const chained = io.chain((x) => IO(() => x * 2));

    expect(chained.run()).toBe(4);
  });

  it("supports of / pure", () => {
    const io = IO.of(5);
    expect(io.run()).toBe(5);
  });
});
