// tests/adt.io.test.ts
import { describe, it, expect } from "vitest";
import {
  IO,
  of,
  map,
  chain,
  ap,
  fromThunk,
  toThunk,
  isIO,
  ioModule,
} from "@/adt/io";
import { fl } from "@/adt/fl";

describe("IO ADT", () => {
  it("constructs a lazy thunk", () => {
    let called = 0;
    const io = IO(() => {
      called += 1;
      return 42;
    });

    expect(called).toBe(0);
    expect(io.run()).toBe(42);
    expect(called).toBe(1);
    expect(io.run()).toBe(42);
    expect(called).toBe(2);
  });

  it("of returns a constant IO", () => {
    const io = of(10);
    expect(io.run()).toBe(10);
  });

  it("map transforms the result", () => {
    const io = of(2);
    const doubled = map((n: number) => n * 2)(io);
    expect(doubled.run()).toBe(4);
  });

  it("chain sequences computations", () => {
    const io = of(2);
    const chained = chain((n: number) => of(n * 3))(io);
    expect(chained.run()).toBe(6);
  });

  it("ap applies a function IO to a value IO", () => {
    const fab = of((n: number) => n + 1);
    const fa = of(4);
    const fb = ap(fab)(fa);
    expect(fb.run()).toBe(5);
  });

  it("fromThunk/toThunk interop with function IO", () => {
    const thunk = () => 7;
    const io = fromThunk(thunk);
    expect(io.run()).toBe(7);

    const back = toThunk(io);
    expect(back()).toBe(7);
  });

  it("isIO detects IO values", () => {
    const io = of(1);
    expect(isIO(io)).toBe(true);
    expect(isIO(123)).toBe(false);
    expect(isIO({ run: () => 1 })).toBe(false);
  });

  it("exposes Fantasy-Land methods on the value", () => {
    const io = of(3);

    const mapped = (io as any)[fl.map]((n: number) => n + 2);
    expect(mapped.run()).toBe(5);

    const chained = (io as any)[fl.chain]((n: number) => of(n * 2));
    expect(chained.run()).toBe(6);
  });

  it("ioModule exposes fp-ts style dictionary", () => {
    const fa = of(2);
    const fb = ioModule.map(fa, (n: number) => n + 1);
    expect(fb.run()).toBe(3);

    const fc = ioModule.chain(fb, (n: number) => of(n * 10));
    expect(fc.run()).toBe(30);

    const fab = ioModule.of((n: number) => n - 1);
    const fd = ioModule.ap(fab, of(10));
    expect(fd.run()).toBe(9);
  });
});
