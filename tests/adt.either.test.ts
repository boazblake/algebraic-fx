// tests/adt.either.test.ts
import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { fl } from "@/adt/fl";
import {
  Either,
  left,
  right,
  of,
  map,
  ap,
  chain,
  mapLeft,
  bimap,
  match,
  either,
  getOrElse,
  fromNullable,
  fromPredicate,
  tryCatch,
  isEither,
  EitherModule,
} from "@/adt/either";

const eqEither = <E, A>(x: Either<E, A>, y: Either<E, A>): boolean => {
  if (x._tag !== y._tag) return false;
  if (x._tag === "Left" && y._tag === "Left") return Object.is(x.left, y.left);
  if (x._tag === "Right" && y._tag === "Right")
    return Object.is(x.right, y.right);
  return false;
};

describe("Either ADT", () => {
  it("constructs Left and Right", () => {
    const e1 = left<string, number>("err");
    const e2 = right<string, number>(42);

    expect(e1._tag).toBe("Left");
    expect(e1.left).toBe("err");
    expect(e2._tag).toBe("Right");
    expect(e2.right).toBe(42);
  });

  it("of wraps a value in Right", () => {
    const e = of(10);
    expect(e._tag).toBe("Right");
    expect((e as any).right).toBe(10);
  });

  it("map transforms Right and leaves Left", () => {
    const r = right<string, number>(2);
    const l = left<string, number>("oops");

    const r2 = map(r, (n) => n + 1);
    const l2 = map(l, (n) => n + 1);

    expect(eqEither(r2, right(3))).toBe(true);
    expect(eqEither(l2, l)).toBe(true);
  });

  it("chain sequences computations", () => {
    const f = (n: number): Either<string, number> =>
      n > 0 ? right(n * 2) : left("neg");

    const r = right<string, number>(2);
    const l = left<string, number>("oops");

    const r2 = chain(r, f);
    const l2 = chain(l, f);

    expect(eqEither(r2, right(4))).toBe(true);
    expect(eqEither(l2, l)).toBe(true);
  });

  it("ap applies function in Right to value in Right", () => {
    const fab = right<string, (n: number) => number>((n) => n + 1);
    const fa = right<string, number>(2);
    const fl = left<string, number>("err");

    const r = ap(fab, fa);
    const r2 = ap(fab, fl);

    expect(eqEither(r, right(3))).toBe(true);
    expect(eqEither(r2, fl)).toBe(true);
  });

  it("mapLeft and bimap transform Left and Right appropriately", () => {
    const l = left<number, string>(1);
    const r = right<number, string>("ok");

    const l2 = mapLeft(l, (n) => n + 1);
    const r2 = mapLeft(r, (n) => n + 1);

    expect(eqEither(l2, left(2))).toBe(true);
    expect(eqEither(r2, r)).toBe(true);

    const l3 = bimap(
      l,
      (n) => n * 2,
      (s) => s + "!"
    );
    const r3 = bimap(
      r,
      (n) => n * 2,
      (s) => s + "!"
    );

    expect(eqEither(l3, left(2))).toBe(true);
    expect(eqEither(r3, right("ok!"))).toBe(true);
  });

  it("fromNullable and getOrElse interop", () => {
    const fromN = fromNullable(() => "null");

    const e1 = fromN<number | null>(1);
    const e2 = fromN<number | null>(null);

    const g1 = getOrElse<string, number>(() => 0)(e1);
    const g2 = getOrElse<string, number>(() => 0)(e2 as any);

    expect(g1).toBe(1);
    expect(g2).toBe(0);
  });

  it("fromPredicate builds Either based on predicate", () => {
    const fromPositive = fromPredicate(
      (n: number) => n > 0,
      (n) => `non positive: ${n}`
    );

    const e1 = fromPositive(3);
    const e2 = fromPositive(-1);

    expect(eqEither(e1, right(3))).toBe(true);
    expect(eqEither(e2, left("non positive: -1"))).toBe(true);
  });

  it("match and either perform pattern matching", () => {
    const l = left<string, number>("err");
    const r = right<string, number>(10);

    const toString = match(
      (e) => `L:${e}`,
      (n) => `R:${n}`
    );

    expect(toString(l)).toBe("L:err");
    expect(toString(r)).toBe("R:10");

    const toString2 = either(
      (e) => `L:${e}`,
      (n) => `R:${n}`
    );

    expect(toString2(l)).toBe("L:err");
    expect(toString2(r)).toBe("R:10");
  });

  it("tryCatch converts exceptions into Left", () => {
    const ok = tryCatch(
      () => JSON.parse('{"x":1}'),
      (e) => (e as Error).message
    );
    const bad = tryCatch(
      () => JSON.parse("{"),
      (e) => (e as Error).name
    );

    expect(ok._tag).toBe("Right");
    expect((ok as any).right).toEqual({ x: 1 });
    expect(bad._tag).toBe("Left");
    expect(String((bad as any).left)).toContain("SyntaxError");
  });

  it("isEither detects Either values", () => {
    expect(isEither(right(1))).toBe(true);
    expect(isEither(left("x"))).toBe(true);
    expect(isEither(1)).toBe(false);
    expect(isEither({ _tag: "Right" })).toBe(false);
  });

  it("exposes Fantasy Land methods on the value", () => {
    const e = right<string, number>(4);

    const e1 = (e as any)[fl.map]((n: number) => n + 1) as Either<
      string,
      number
    >;
    expect(eqEither(e1, right(5))).toBe(true);

    const fab = right<string, (n: number) => number>((n) => n * 2);
    const e2 = (fab as any)[fl.ap](right<string, number>(3)) as Either<
      string,
      number
    >;
    expect(eqEither(e2, right(6))).toBe(true);

    const e3 = (e as any)[fl.chain]((n: number) =>
      n > 0 ? right<string, number>(n * 3) : left<string, number>("neg")
    ) as Either<string, number>;
    expect(eqEither(e3, right(12))).toBe(true);

    const l = left<string, number>("err");
    const e4 = (l as any)[fl.bimap](
      (s: string) => s + "!",
      (n: number) => n + 1
    ) as Either<string, number>;
    expect(eqEither(e4, left("err!"))).toBe(true);
  });

  it("EitherModule exposes fp ts style dictionary", () => {
    expect(EitherModule.URI).toBe("Either");
    expect(typeof EitherModule.of).toBe("function");
    expect(typeof EitherModule.map).toBe("function");
    expect(typeof EitherModule.ap).toBe("function");
    expect(typeof EitherModule.chain).toBe("function");
    expect(typeof (EitherModule as any)[fl.of]).toBe("function");

    const e = EitherModule.of(2);
    const e2 = EitherModule.map(e, (n: number) => n + 1);
    expect(eqEither(e2 as any, right(3))).toBe(true);
  });
});
