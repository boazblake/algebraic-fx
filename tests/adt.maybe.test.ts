import { describe, it, expect } from "vitest";
import {
  Just,
  Nothing,
  Maybe,
  map,
  ap,
  chain,
  of,
  fold,
  getOrElse,
  getOrElseW,
  alt,
  fromNullable,
  toNullable,
  toUndefined,
  isJust,
  isNothing,
  filter,
  traverse,
  sequence,
  type Just as JustT,
  type Nothing as NothingT,
} from "../src/adt/maybe.js";

describe("Maybe", () => {
  it("constructs Just and Nothing", () => {
    const j = Just(42);
    const n = Nothing as Maybe<number>;

    expect(j._tag).toBe("Just");
    expect((j as any).value).toBe(42);
    expect(n._tag).toBe("Nothing");
  });

  it("map applies only on Just", () => {
    const j = Just(1);
    const n = Nothing as Maybe<number>;

    const j2 = map((x: number) => x + 1, j);
    const n2 = map((x: number) => x + 1, n);

    expect(j2._tag).toBe("Just");
    expect((j2 as any).value).toBe(2);
    expect(n2._tag).toBe("Nothing");
  });

  it("ap applies function when both are Just", () => {
    const f = Just((x: number) => x * 2);
    const v = Just(3);
    const n = Nothing as Maybe<number>;

    const r1 = ap(f, v);
    const r2 = ap(f, n);
    const r3 = ap(Nothing as Maybe<(x: number) => number>, v);

    expect(r1._tag).toBe("Just");
    expect((r1 as any).value).toBe(6);
    expect(r2._tag).toBe("Nothing");
    expect(r3._tag).toBe("Nothing");
  });

  it("chain behaves like flatMap", () => {
    const f = (x: number): Maybe<number> =>
      x > 0 ? Just(x + 1) : (Nothing as Maybe<number>);

    expect(chain(f, Just(1))._tag).toBe("Just");
    expect(chain(f, Just(-1))._tag).toBe("Nothing");
    expect(chain(f, Nothing as Maybe<number>)._tag).toBe("Nothing");
  });

  it("of lifts to Just", () => {
    const m = of("a");
    expect(m._tag).toBe("Just");
    expect((m as any).value).toBe("a");
  });

  it("fold pattern matches correctly", () => {
    const j = Just(10);
    const n = Nothing as Maybe<number>;

    const r1 = fold(
      () => 0,
      (x) => x * 2,
      j
    );
    const r2 = fold(
      () => 0,
      (x) => x * 2,
      n
    );

    expect(r1).toBe(20);
    expect(r2).toBe(0);
  });

  it("getOrElse and getOrElseW", () => {
    const j = Just("ok");
    const n = Nothing as Maybe<string>;

    expect(getOrElse("fallback", j)).toBe("ok");
    expect(getOrElse("fallback", n)).toBe("fallback");

    expect(getOrElseW(() => "lazy", j)).toBe("ok");
    expect(getOrElseW(() => "lazy", n)).toBe("lazy");
  });

  it("alt returns first Just", () => {
    const j = Just(1);
    const n = Nothing as Maybe<number>;

    expect(alt(j, n)._tag).toBe("Just");
    expect((alt(j, n) as any).value).toBe(1);

    expect(alt(n, j)._tag).toBe("Just");
    expect((alt(n, j) as any).value).toBe(1);

    expect(alt(n, n)._tag).toBe("Nothing");
  });

  it("fromNullable and toNullable/toUndefined", () => {
    const a = fromNullable<number | null>(null);
    const b = fromNullable(5);

    expect(a._tag).toBe("Nothing");
    expect(b._tag).toBe("Just");
    expect(toNullable(b)).toBe(5);
    expect(toNullable(a)).toBeNull();
    expect(toUndefined(a)).toBeUndefined();
  });

  it("isJust / isNothing narrow correctly", () => {
    const j = Just(1);
    const n = Nothing as Maybe<number>;

    if (isJust(j)) {
      const _x: JustT<number> = j;
      expect(_x.value).toBe(1);
    } else {
      throw new Error("should be Just");
    }

    if (isNothing(n)) {
      const _n: NothingT = n;
      expect(_n._tag).toBe("Nothing");
    } else {
      throw new Error("should be Nothing");
    }
  });

  it("filter", () => {
    const j = Just(2);
    const r1 = filter((x) => x % 2 === 0, j);
    const r2 = filter((x) => x % 2 !== 0, j);
    const r3 = filter((x) => x % 2 === 0, Nothing as Maybe<number>);

    expect(r1._tag).toBe("Just");
    expect(r2._tag).toBe("Nothing");
    expect(r3._tag).toBe("Nothing");
  });

  it("traverse and sequence", () => {
    const arr = [1, 2, 3];
    const t1 = traverse((x) => Just(x + 1), arr);
    const t2 = traverse(
      (x) => (x > 2 ? (Nothing as Maybe<number>) : Just(x)),
      arr
    );

    expect(t1._tag).toBe("Just");
    expect((t1 as any).value).toEqual([2, 3, 4]);
    expect(t2._tag).toBe("Nothing");

    const s1 = sequence([Just(1), Just(2)]);
    const s2 = sequence([Just(1), Nothing as Maybe<number>]);

    expect(s1._tag).toBe("Just");
    expect((s1 as any).value).toEqual([1, 2]);
    expect(s2._tag).toBe("Nothing");
  });
});
