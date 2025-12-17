import { describe, it, expect } from "vitest";
import {
  StateModule,
  of,
  map,
  chain,
  ap,
  get,
  put,
  modify,
  evalState,
  execState,
  isState,
} from "@/adt/state";
import { fl } from "@/adt/fl";

describe("State ADT", () => {
  it("constructs a State and runs it", () => {
    const s = of<number, number>(5);
    const [value, next] = s.run(10);
    expect(value).toBe(5);
    expect(next).toBe(10);
  });

  it("of wraps a value without changing the state", () => {
    const s = of<number, string>("ok");
    const [value, next] = s.run(100);
    expect(value).toBe("ok");
    expect(next).toBe(100);
  });

  it("map transforms the value and preserves the state", () => {
    const s = of<number, number>(2);
    const mapped = map<number, number, number>((n) => n * 3)(s);
    const [value, next] = mapped.run(5);
    expect(value).toBe(6);
    expect(next).toBe(5);
  });

  it("chain sequences computations with state threading", () => {
    const double = (n: number) => of<number, number>(n * 2);
    const s0 = of<number, number>(1);
    const chained = chain<number, number, number>(double)(s0);
    const [value, next] = chained.run(3);
    expect(value).toBe(2);
    expect(next).toBe(3);
  });

  it("ap applies a function State to a value State", () => {
    const sf = of<number, (n: number) => number>((n) => n + 5);
    const sv = of<number, number>(10);
    const result = ap<number, number, number>(sf)(sv);
    const [value, next] = result.run(100);
    expect(value).toBe(15);
    expect(next).toBe(100);
  });

  it("get reads the current state", () => {
    const s = get<number>();
    const [value, next] = s.run(7);
    expect(value).toBe(7);
    expect(next).toBe(7);
  });

  it("put replaces the state", () => {
    const s = put<number>(99);
    const [value, next] = s.run(0);
    expect(value).toBeUndefined();
    expect(next).toBe(99);
  });

  it("modify updates the state using a function", () => {
    const s = modify<number>((n) => n + 1);
    const [value, next] = s.run(10);
    expect(value).toBeUndefined();
    expect(next).toBe(11);
  });

  it("evalState returns the value only", () => {
    const s = of<number, string>("ok");
    const value = evalState(s, 123);
    expect(value).toBe("ok");
  });

  it("execState returns the state only", () => {
    const s = of<number, string>("ok");
    const state = execState(s, 123);
    expect(state).toBe(123);
  });

  it("isState detects State values", () => {
    const s = of<number, number>(1);
    expect(isState(s)).toBe(true);
    expect(isState({})).toBe(false);
  });

  it("exposes Fantasy-Land methods on the value", () => {
    const s0 = of<number, number>(2) as any;

    const r1 = s0[fl.map]((x: number) => x + 1);
    const r2 = r1[fl.chain]((x: number) => of<number, number>(x * 3));
    const r3 = r2[fl.ap](of<number, (n: number) => number>((n) => n - 4));

    const [value] = r3.run(10);
    expect(value).toBe((2 + 1) * 3 - 4);
  });

  it("StateModule exposes fp-ts style dictionary and FL.of", () => {
    expect(StateModule.URI).toBe("State");
    expect(typeof StateModule.of).toBe("function");
    expect(typeof StateModule.map).toBe("function");
    expect(typeof StateModule.chain).toBe("function");
    expect(typeof StateModule.ap).toBe("function");

    const s1 = StateModule.of<number, number>(5);
    const [v1, st1] = s1.run(10);
    expect(v1).toBe(5);
    expect(st1).toBe(10);

    const viaFlOf = (StateModule as any)[fl.of] as <S, A>(
      a: A
    ) => import("@/adt/state").State<S, A>;

    const s2 = viaFlOf<number, number>(7);
    const [v2, st2] = s2.run(1);
    expect(v2).toBe(7);
    expect(st2).toBe(1);
  });
});
