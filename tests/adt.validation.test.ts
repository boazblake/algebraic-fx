// tests/adt.validation.test.ts
import { describe, it, expect } from "vitest";
import {
  Validation,
  failure,
  success,
  of,
  map,
  mapFailure,
  bimap,
  match,
  getOrElse,
  fromPredicate,
  fromNullable,
  getValidationApplicative,
  semigroupString,
  semigroupArray,
  ValidationModule,
} from "@/adt/validation";
import { fl } from "@/adt/fl";

const eqValidation = <E, A>(
  x: Validation<E, A>,
  y: Validation<E, A>
): boolean => {
  if (x._tag !== y._tag) return false;
  if (x._tag === "Failure" && y._tag === "Failure") {
    return Object.is(x.left, (y as any).left);
  }
  if (x._tag === "Success" && y._tag === "Success") {
    return Object.is((x as any).right, (y as any).right);
  }
  return false;
};

describe("Validation ADT", () => {
  it("constructs Failure and Success", () => {
    const f = failure<string, number>("err");
    const s = success<string, number>(42);

    expect(f._tag).toBe("Failure");
    expect(f.left).toBe("err");
    expect(s._tag).toBe("Success");
    expect(s.right).toBe(42);
  });

  it("of wraps a value in Success", () => {
    const v = of(10);
    expect(v._tag).toBe("Success");
    expect(v.right).toBe(10);
  });

  it("map transforms Success and leaves Failure", () => {
    const f = failure<string, number>("err");
    const s = success<string, number>(2);

    const f2 = map<number, number>((n) => n * 2)<string>(f);
    const s2 = map<number, number>((n) => n * 2)<string>(s);

    expect(eqValidation(f, f2)).toBe(true);
    expect(s2._tag).toBe("Success");
    expect(s2.right).toBe(4);
  });

  it("mapFailure transforms Failure and leaves Success", () => {
    const f = failure<string, number>("err");
    const s = success<string, number>(2);

    const f2 = mapFailure<string, string>((e) => `prefix:${e}`)(f);
    const s2 = mapFailure<string, string>((e) => `prefix:${e}`)(s);

    expect(f2._tag).toBe("Failure");
    expect(f2.left).toBe("prefix:err");
    expect(eqValidation(s, s2)).toBe(true);
  });

  it("bimap transforms both sides", () => {
    const f = failure<string, number>("err");
    const s = success<string, number>(2);

    const f2 = bimap<string, string, number, number>(
      (e) => `x:${e}`,
      (n) => n * 2
    )(f);
    const s2 = bimap<string, string, number, number>(
      (e) => `x:${e}`,
      (n) => n * 2
    )(s);

    expect(f2._tag).toBe("Failure");
    expect(f2.left).toBe("x:err");
    expect(s2._tag).toBe("Success");
    expect(s2.right).toBe(4);
  });

  it("getOrElse returns default for Failure and value for Success", () => {
    const f = failure<string, number>("err");
    const s = success<string, number>(5);

    const def = () => 99;

    expect(getOrElse(def)<string>(f)).toBe(99);
    expect(getOrElse(def)<string>(s)).toBe(5);
  });

  it("match performs pattern matching", () => {
    const f = failure<string, number>("err");
    const s = success<string, number>(7);

    const r1 = match(
      (e: string) => `E:${e}`,
      (n: number) => `V:${n}`
    )(f);

    const r2 = match(
      (e: string) => `E:${e}`,
      (n: number) => `V:${n}`
    )(s);

    expect(r1).toBe("E:err");
    expect(r2).toBe("V:7");
  });

  it("fromPredicate builds Validation based on predicate", () => {
    const pred = (n: number) => n > 0;
    const mk = fromPredicate(pred, (n: number) => `non positive: ${n}`);

    const v1 = mk(1);
    const v2 = mk(0);

    expect(v1._tag).toBe("Success");
    expect(v1.right).toBe(1);
    expect(v2._tag).toBe("Failure");
    expect(v2.left).toBe("non positive: 0");
  });

  it("fromNullable converts nullable to Validation", () => {
    const mk = fromNullable<number, string>(() => "nullish");

    const v1 = mk(5);
    const v2 = mk(null);

    expect(v1._tag).toBe("Success");
    expect(v1.right).toBe(5);
    expect(v2._tag).toBe("Failure");
    expect(v2.left).toBe("nullish");
  });

  it("Applicative ap accumulates errors using semigroupString", () => {
    const A = getValidationApplicative<string>(semigroupString);

    const fab = failure<string, (n: number) => number>("e1");
    const fa = failure<string, number>("e2");

    const r = A.ap(fab, fa);

    expect(r._tag).toBe("Failure");
    expect(r.left).toBe("e1e2");
  });

  it("Applicative ap accumulates errors using semigroupArray", () => {
    const S = semigroupArray<string>();
    const A = getValidationApplicative<string[]>(S);

    const fab = failure<string[], (n: number) => number>(["e1"]);
    const fa = failure<string[], number>(["e2"]);

    const r = A.ap(fab, fa);

    expect(r._tag).toBe("Failure");
    expect(r.left).toEqual(["e1", "e2"]);
  });

  it("ValidationModule exposes fp ts style dictionary and FL of", () => {
    expect(ValidationModule.URI).toBe("Validation");
    expect(typeof ValidationModule.of).toBe("function");
    expect(typeof ValidationModule.map).toBe("function");
    expect(typeof ValidationModule.getValidationApplicative).toBe("function");
    expect(ValidationModule[fl.of]).toBe(of);
  });
});
