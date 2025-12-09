// tests/adt.state.test.ts
import { describe, it, expect } from "vitest";
import State from "../src/adt/state.js";

describe("State", () => {
  it("get / put / modify", () => {
    // Start from 0:
    //  - put(1)      -> state = 1
    //  - modify(+1)  -> state = 2
    //  - get()       -> value = 2, state = 2
    const program = State.put<number>(1)
      .chain(() => State.modify<number>((s) => s + 1))
      .chain(() => State.get<number>());

    const [value, final] = program.run(0);

    expect(value).toBe(2);
    expect(final).toBe(2);
  });

  it("map", () => {
    const doubled = State.of<number, number>(1).map((n) => n * 2);

    const [value, final] = doubled.run(0);

    expect(value).toBe(2);
    expect(final).toBe(0); // state unchanged by map
  });

  it("chain", () => {
    const program = State.of<number, number>(1).chain((n) =>
      State.of<number, number>(n + 2)
    );

    const [value, final] = program.run(0);

    expect(value).toBe(3);
    expect(final).toBe(0); // no state changes in this program
  });
});
