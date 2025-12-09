import { describe, it, expect } from "vitest";
import {
  Left,
  Right,
  Either,
  map,
  ap,
  chain,
  bimap,
  mapLeft,
  fold,
  of,
  getOrElse,
  getOrElseW,
  alt,
  isLeft,
  isRight,
  fromNullable,
  tryCatch,
  tryCatchK,
  swap,
  filterOrElse,
  traverse,
  sequence,
  type Left as LeftT,
  type Right as RightT,
} from "../src/adt/either.js";

describe("Either", () => {
  it("constructs Left and Right", () => {
    const l = Left("err");
    const r = Right(42);

    expect(l._tag).toBe("Left");
    expect((l as any).left).toBe("err");
    expect(r._tag).toBe("Right");
    expect((r as any).right).toBe(42);
  });

  it("map maps Right only", () => {
    const e1 = map((x: number) => x + 1, Right(1) as Either<string, number>);
    const e2 = map((x: number) => x + 1, Left("err") as Either<string, number>);

    expect(isRight(e1)).toBe(true);
    if (isRight(e1)) {
      expect((e1 as any).right).toBe(2);
    }
    expect(isLeft(e2)).toBe(true);
  });

  it("ap applies function and value when both Right", () => {
    const ef = Right((x: number) => x * 2) as Either<
      string,
      (x: number) => number
    >;
    const ev = Right(3) as Either<string, number>;
    const el = Left("err") as Either<string, number>;

    const r1 = ap(ef, ev);
    const r2 = ap(ef, el);
    const r3 = ap(Left("fail") as Either<string, (x: number) => number>, ev);

    expect(isRight(r1)).toBe(true);
    if (isRight(r1)) {
      expect(r1.right).toBe(6);
    }
    expect(isLeft(r2)).toBe(true);
    expect(isLeft(r3)).toBe(true);
  });

  it("chain sequences Right, short-circuits Left", () => {
    const f = (x: number): Either<string, number> =>
      x > 0 ? Right(x + 1) : Left("neg");

    const r1 = chain(f, Right(1) as Either<string, number>);
    const r2 = chain(f, Right(-1) as Either<string, number>);
    const r3 = chain(f, Left("err") as Either<string, number>);

    expect(isRight(r1)).toBe(true);
    if (isRight(r1)) expect(r1.right).toBe(2);
    expect(isLeft(r2)).toBe(true);
    expect(isLeft(r3)).toBe(true);
  });

  it("bimap and mapLeft", () => {
    const e: Either<string, number> = Left("err");

    const b = bimap(
      (s) => `prefix:${s}`,
      (x) => x * 2,
      e
    );
    expect(isLeft(b)).toBe(true);
    if (isLeft(b)) expect(b.left).toBe("prefix:err");

    const m = mapLeft((s: string) => s.toUpperCase(), e);
    expect(isLeft(m)).toBe(true);
    if (isLeft(m)) expect(m.left).toBe("ERR");
  });

  it("fold pattern matches", () => {
    const e1: Either<string, number> = Right(5);
    const e2: Either<string, number> = Left("fail");

    const r1 = fold(
      () => 0,
      (x) => x * 2,
      e1
    );
    const r2 = fold(
      () => 0,
      (x) => x * 2,
      e2
    );

    expect(r1).toBe(10);
    expect(r2).toBe(0);
  });

  it("of, getOrElse, getOrElseW", () => {
    const e = of(10);
    const l = Left("err") as Either<string, number>;

    expect(isRight(e)).toBe(true);
    expect(getOrElse(0, e)).toBe(10);
    expect(getOrElse(0, l)).toBe(0);

    expect(getOrElseW((s: string) => s.length, l)).toBe("err".length);
  });

  it("alt", () => {
    const e1 = Left("x") as Either<string, number>;
    const e2 = Right(1) as Either<string, number>;
    const e3 = Right(2) as Either<string, number>;

    const r1 = alt(e2, e3); // e2
    const r2 = alt(e1, e2); // e2
    const r3 = alt(e1, e1); // Left

    expect(isRight(r1)).toBe(true);
    if (isRight(r1)) expect(r1.right).toBe(1);

    expect(isRight(r2)).toBe(true);
    expect(isLeft(r3)).toBe(true);
  });

  it("isLeft / isRight narrow correctly", () => {
    const e1: Either<string, number> = Right(1);
    const e2: Either<string, number> = Left("err");

    if (isRight(e1)) {
      const r: RightT<number> = e1;
      expect(r.right).toBe(1);
    } else {
      throw new Error("expected Right");
    }

    if (isLeft(e2)) {
      const l: LeftT<string> = e2;
      expect(l.left).toBe("err");
    } else {
      throw new Error("expected Left");
    }
  });

  it("fromNullable", () => {
    const f = fromNullable("missing");
    const e1 = f(null);
    const e2 = f(10);

    expect(isLeft(e1)).toBe(true);
    expect(isRight(e2)).toBe(true);
  });

  it("tryCatch and tryCatchK", () => {
    const ok = tryCatch(() => 1);
    const fail = tryCatch(() => {
      throw new Error("boom");
    });

    expect(isRight(ok)).toBe(true);
    expect(isLeft(fail)).toBe(true);

    const ok2 = tryCatchK(
      () => 2,
      () => "bad"
    );
    const fail2 = tryCatchK(
      () => {
        throw new Error("boom");
      },
      () => "mapped"
    );

    expect(isRight(ok2)).toBe(true);
    expect(isLeft(fail2)).toBe(true);
    if (isLeft(fail2)) expect(fail2.left).toBe("mapped");
  });

  it("swap", () => {
    const e1 = swap(Left("err") as Either<string, number>);
    const e2 = swap(Right(1) as Either<string, number>);

    expect(isRight(e1)).toBe(true);
    expect(isLeft(e2)).toBe(true);
  });

  it("filterOrElse", () => {
    const e1 = Right(2) as Either<string, number>;
    const e2 = Right(3) as Either<string, number>;

    const r1 = filterOrElse(
      (x) => x % 2 === 0,
      () => "odd",
      e1
    );
    const r2 = filterOrElse(
      (x) => x % 2 === 0,
      () => "odd",
      e2
    );

    expect(isRight(r1)).toBe(true);
    expect(isLeft(r2)).toBe(true);
  });

  it("traverse and sequence", () => {
    const arr = [1, 2, 3];
    const t1 = traverse((x) => Right(x + 1) as Either<string, number>, arr);
    const t2 = traverse(
      (x) => (x > 2 ? Left("big") : Right(x)) as Either<string, number>,
      arr
    );

    expect(isRight(t1)).toBe(true);
    if (isRight(t1)) expect(t1.right).toEqual([2, 3, 4]);
    expect(isLeft(t2)).toBe(true);

    const s1 = sequence([
      Right(1) as Either<string, number>,
      Right(2) as Either<string, number>,
    ]);
    const s2 = sequence([
      Right(1) as Either<string, number>,
      Left("bad") as Either<string, number>,
    ]);

    expect(isRight(s1)).toBe(true);
    expect(isLeft(s2)).toBe(true);
  });
});
