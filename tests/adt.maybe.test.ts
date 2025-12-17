// tests/adt.maybe.test.ts
import { describe, it, expect } from "vitest";
import {
  MaybeModule,
  just,
  nothing,
  of,
  map,
  chain,
  ap,
  fromNullable,
  toNullable,
  toUndefined,
  fromPredicate,
  withDefault,
  match,
  maybe,
  isJust,
  isNothing,
  isMaybe,
} from "@/adt/maybe";
import { fl } from "@/adt/fl";

const eqMaybe = <A>(
  x: ReturnType<typeof just> | typeof nothing,
  y: ReturnType<typeof just> | typeof nothing
): boolean => {
  if (isNothing(x) && isNothing(y)) return true;
  if (isJust(x) && isJust(y)) return x.value === y.value;
  return false;
};

describe("Maybe ADT", () => {
  it("constructs Just and Nothing", () => {
    const j = just(1);
    expect(isJust(j)).toBe(true);
    expect(j.value).toBe(1);

    expect(isNothing(nothing)).toBe(true);
  });

  it("of wraps a value in Just", () => {
    const j = of("x");
    expect(isJust(j)).toBe(true);
    expect((j as any).value).toBe("x");
  });

  it("map transforms Just and leaves Nothing", () => {
    const j = just(2);
    const n = nothing;

    const j2 = map((x: number) => x * 2)(j);
    const n2 = map((x: number) => x * 2)(n);

    expect(isJust(j2)).toBe(true);
    expect((j2 as any).value).toBe(4);
    expect(isNothing(n2)).toBe(true);
  });

  it("chain sequences computations", () => {
    const safeRecip = (n: number) => (n === 0 ? nothing : just(1 / n));

    const j = chain(safeRecip)(just(2));
    const n = chain(safeRecip)(just(0));

    expect(isJust(j)).toBe(true);
    expect((j as any).value).toBe(0.5);
    expect(isNothing(n)).toBe(true);
  });

  it("ap applies function in Maybe to value in Maybe", () => {
    const mf = just((n: number) => n + 1);
    const j = ap<number, number>(mf)(just(1));
    const n1 = ap<number, number>(mf)(nothing);
    const n2 = ap<number, number>(nothing as any)(just(1));

    expect(isJust(j)).toBe(true);
    expect((j as any).value).toBe(2);
    expect(isNothing(n1)).toBe(true);
    expect(isNothing(n2)).toBe(true);
  });

  it("fromNullable and toNullable interop", () => {
    const j = fromNullable(3);
    const n = fromNullable<number | null>(null);

    expect(isJust(j)).toBe(true);
    expect(toNullable(j)).toBe(3);
    expect(isNothing(n)).toBe(true);
    expect(toNullable(n)).toBeNull();
  });

  it("toUndefined returns undefined for Nothing", () => {
    const j = just("x");
    const n = nothing;

    expect(toUndefined(j)).toBe("x");
    expect(toUndefined(n)).toBeUndefined();
  });

  it("fromPredicate builds Maybe based on predicate", () => {
    const positive = fromPredicate((n: number) => n > 0);

    expect(isJust(positive(1))).toBe(true);
    expect(isNothing(positive(0))).toBe(true);
  });

  it("withDefault returns default for Nothing", () => {
    const d = withDefault(42);

    expect(d(just(1))).toBe(1);
    expect(d(nothing as any)).toBe(42);
  });

  it("match and maybe perform pattern matching", () => {
    const onNothing = () => "none";
    const onJust = (n: number) => `just:${n}`;

    const r1 = match(onNothing, onJust)(just(5));
    const r2 = match(onNothing, onJust)(nothing as any);

    expect(r1).toBe("just:5");
    expect(r2).toBe("none");

    const r3 = maybe("none", onJust)(just(7));
    const r4 = maybe("none", onJust)(nothing as any);

    expect(r3).toBe("just:7");
    expect(r4).toBe("none");
  });

  it("isMaybe detects Maybe values", () => {
    expect(isMaybe(just(1))).toBe(true);
    expect(isMaybe(nothing)).toBe(true);
    expect(isMaybe(1)).toBe(false);
    expect(isMaybe({})).toBe(false);
  });

  it("exposes Fantasy-Land methods on the value", () => {
    const j = just(2);
    const j2 = j[fl.map]((n: number) => n + 3);
    const j3 = j2[fl.chain]((n: number) => (n > 4 ? just(n * 2) : nothing));

    expect(eqMaybe(j2 as any, just(5))).toBe(true);
    expect(eqMaybe(j3 as any, just(10))).toBe(true);

    const j4 = j;
    expect(eqMaybe(j4 as any, just(9))).toBe(false);
  });

  it("MaybeModule exposes fp-ts style dictionary", () => {
    const m1 = MaybeModule.of(1);
    const m2 = MaybeModule.map((n: number) => n + 1)(m1);
    const m3 = MaybeModule.chain((n: number) => of(n * 2))(m2);

    expect(isJust(m3)).toBe(true);
    expect((m3 as any).value).toBe(4);
    expect(MaybeModule.URI).toBe("Maybe");
  });
});
