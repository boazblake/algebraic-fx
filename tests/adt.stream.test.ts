import { describe, it, expect } from "vitest";
import { Stream } from "../src/adt/stream.js";

describe("Stream", () => {
  it("emit values and complete", () => {
    const values: number[] = [];
    let completed = false;

    const s = Stream<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.complete?.();
      return () => {};
    });

    const unsub = s.subscribe({
      next: (v) => values.push(v),
      complete: () => {
        completed = true;
      },
    });

    unsub();
    expect(values).toEqual([1, 2]);
    expect(completed).toBe(true);
  });

  it("map operator", () => {
    const values: number[] = [];

    const src = Stream<number>((o) => {
      o.next(1);
      o.next(2);
      o.complete?.();
      return () => {};
    });

    const mapped = src.map((x) => x * 2);

    mapped.subscribe({
      next: (v) => values.push(v),
    });

    expect(values).toEqual([2, 4]);
  });

  it("filter operator", () => {
    const values: number[] = [];
    const src = Stream<number>((o) => {
      o.next(1);
      o.next(2);
      o.next(3);
      o.complete?.();
      return () => {};
    });

    src
      .filter((x) => x % 2 === 1)
      .subscribe({
        next: (v) => values.push(v),
      });

    expect(values).toEqual([1, 3]);
  });

  it("scan accumulates state", () => {
    const values: number[] = [];
    const src = Stream<number>((o) => {
      o.next(1);
      o.next(2);
      o.next(3);
      o.complete?.();
      return () => {};
    });

    src
      .scan((acc, v) => acc + v, 0)
      .subscribe({
        next: (v) => values.push(v),
      });

    expect(values).toEqual([1, 3, 6]);
  });

  it("debounce delays and emits last value", async () => {
    const values: number[] = [];

    const src = Stream<number>((o) => {
      o.next(1);
      setTimeout(() => o.next(2), 5);
      setTimeout(() => o.next(3), 10);
      setTimeout(() => o.complete?.(), 15);
      return () => {};
    });

    const debounced = Stream.debounce<number>(5)(src);

    debounced.subscribe({
      next: (v) => values.push(v),
    });

    await new Promise((r) => setTimeout(r, 25));
    expect(values.at(-1)).toBe(3);
  });
});
