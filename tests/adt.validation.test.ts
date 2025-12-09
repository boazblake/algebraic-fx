import { describe, it, expect } from "vitest";
import {
  Validation,
  Success,
  Failure,
  map,
  ap,
  chain,
  fold,
  combine,
  traverse,
  sequence,
  isSuccess,
  isFailure,
} from "../src/adt/validation.js";

describe("Validation", () => {
  it("constructs Success and Failure", () => {
    const s = Success(42);
    const f = Failure(["error"]);

    expect(s._tag).toBe("Success");
    expect((s as any).value).toBe(42);
    expect(f._tag).toBe("Failure");
    expect((f as any).errors).toEqual(["error"]);
  });

  it("map applies only on Success", () => {
    const s = Success(1);
    const f = Failure<string, number>(["err"]);

    const s2 = map((x: number) => x + 1, s);
    const f2 = map((x: number) => x + 1, f);

    expect(isSuccess(s2)).toBe(true);
    if (isSuccess(s2)) expect(s2.value).toBe(2);
    expect(isFailure(f2)).toBe(true);
  });

  it("ap accumulates errors", () => {
    const vf = Success((x: number) => x * 2);
    const va = Success(3);
    const vf2 = Failure<string, (x: number) => number>(["err1"]);
    const va2 = Failure<string, number>(["err2"]);

    const r1 = ap(vf, va);
    const r2 = ap(vf2, va);
    const r3 = ap(vf, va2);
    const r4 = ap(vf2, va2);

    expect(isSuccess(r1)).toBe(true);
    if (isSuccess(r1)) expect(r1.value).toBe(6);

    expect(isFailure(r2)).toBe(true);
    if (isFailure(r2)) expect(r2.errors).toEqual(["err1"]);

    expect(isFailure(r3)).toBe(true);
    if (isFailure(r3)) expect(r3.errors).toEqual(["err2"]);

    expect(isFailure(r4)).toBe(true);
    if (isFailure(r4)) expect(r4.errors).toEqual(["err1", "err2"]);
  });

  it("chain short-circuits on Failure", () => {
    const f = (x: number) =>
      x > 0 ? Success(x + 1) : Failure<string, number>(["negative"]);

    const r1 = chain(f, Success(1));
    const r2 = chain(f, Success(-1));
    const r3 = chain(f, Failure<string, number>(["initial"]));

    expect(isSuccess(r1)).toBe(true);
    if (isSuccess(r1)) expect(r1.value).toBe(2);

    expect(isFailure(r2)).toBe(true);
    if (isFailure(r2)) expect(r2.errors).toEqual(["negative"]);

    expect(isFailure(r3)).toBe(true);
    if (isFailure(r3)) expect(r3.errors).toEqual(["initial"]);
  });

  it("fold pattern matches", () => {
    const s = Success(10);
    const f = Failure<string, number>(["err"]);

    const r1 = fold(
      () => 0,
      (x) => x * 2,
      s
    );
    const r2 = fold(
      (errs) => errs.length,
      (x) => x * 2,
      f
    );

    expect(r1).toBe(20);
    expect(r2).toBe(1);
  });

  it("combine accumulates all errors", () => {
    const validations = [
      Success(1),
      Failure<string, number>(["err1"]),
      Success(2),
      Failure<string, number>(["err2", "err3"]),
    ];

    const result = combine(validations);

    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) {
      expect(result.errors).toEqual(["err1", "err2", "err3"]);
    }
  });

  it("traverse accumulates all errors", () => {
    const f = (x: number) =>
      x % 2 === 0 ? Success(x) : Failure<string, number>([`${x} is odd`]);

    const arr = [2, 3, 4, 5];
    const result = traverse(f, arr);

    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) {
      expect(result.errors).toEqual(["3 is odd", "5 is odd"]);
    }

    const arr2 = [2, 4, 6];
    const result2 = traverse(f, arr2);

    expect(isSuccess(result2)).toBe(true);
    if (isSuccess(result2)) {
      expect(result2.value).toEqual([2, 4, 6]);
    }
  });

  it("sequence accumulates all errors", () => {
    const validations = [Success(1), Success(2), Success(3)];

    const result = sequence(validations);

    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.value).toEqual([1, 2, 3]);
    }

    const validations2 = [
      Success(1),
      Failure<string, number>(["err1"]),
      Failure<string, number>(["err2"]),
    ];

    const result2 = sequence(validations2);

    expect(isFailure(result2)).toBe(true);
    if (isFailure(result2)) {
      expect(result2.errors).toEqual(["err1", "err2"]);
    }
  });

  it("Validation.fromPredicate", () => {
    const validate = Validation.fromPredicate(
      (x: number) => x > 0,
      (x) => `${x} must be positive`
    );

    const r1 = validate(5);
    const r2 = validate(-3);

    expect(isSuccess(r1)).toBe(true);
    if (isSuccess(r1)) expect(r1.value).toBe(5);

    expect(isFailure(r2)).toBe(true);
    if (isFailure(r2)) expect(r2.errors).toEqual(["-3 must be positive"]);
  });
});
