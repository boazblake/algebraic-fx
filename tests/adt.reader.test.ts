// tests/adt.reader.test.ts
import { fl } from "../src/adt/fl.js";
import {
  Reader,
  of,
  ask,
  asks,
  isReader,
  ReaderModule,
} from "../src/adt/reader.js";

describe("Reader ADT", () => {
  type Env = { n: number };

  test("constructs via of / ask / asks", () => {
    const r1 = of<Env, number>(42);
    expect(r1.run({ n: 0 })).toBe(42);

    const r2 = ask<Env>();
    expect(r2.run({ n: 10 })).toEqual({ n: 10 });

    const r3 = asks<Env, number>((env) => env.n * 2);
    expect(r3.run({ n: 5 })).toBe(10);
  });

  test("map transforms the result", () => {
    const r = of<Env, number>(3);
    const mapped = r.map((x) => x + 1);
    expect(mapped.run({ n: 0 })).toBe(4);
  });

  test("chain sequences computations", () => {
    const r = of<Env, number>(3).chain((x) => of<Env, string>(`v${x}`));
    expect(r.run({ n: 0 })).toBe("v3");
  });

  test("ap applies function Reader to value Reader", () => {
    const fab = of<Env, (x: number) => number>((x) => x * 2);
    const fa = of<Env, number>(5);

    const applied = fab.ap(fa);
    expect(applied.run({ n: 0 })).toBe(10);
  });

  test("isReader detects Reader values", () => {
    const r = of<Env, number>(1);
    expect(isReader(r)).toBe(true);
    expect(isReader(123)).toBe(false);
    expect(isReader({})).toBe(false);
  });

  test("exposes Fantasy-Land methods on the value", () => {
    const r = of<Env, number>(3);

    expect(typeof (r as any)[fl.map]).toBe("function");
    expect(typeof (r as any)[fl.chain]).toBe("function");
    expect(typeof (r as any)[fl.ap]).toBe("function");

    const mapped = (r as any)[fl.map]!((x: number) => x + 1);
    expect(mapped.run({ n: 0 })).toBe(4);

    const chained = (r as any)[fl.chain]!((x: number) =>
      of<Env, number>(x + 2)
    );
    expect(chained.run({ n: 0 })).toBe(5);

    const fab = of<Env, (x: number) => number>((x) => x * 3);
    const applied = (fab as any)[fl.ap]!(of<Env, number>(2));
    expect(applied.run({ n: 0 })).toBe(6);
  });

  test("ReaderModule exposes fp-ts style dictionary and FL of", () => {
    const env: Env = { n: 0 };

    const r = ReaderModule.of<Env, number>(5);
    const mapped = ReaderModule.map(r, (x) => x + 1);
    const chained = ReaderModule.chain(mapped, (x) =>
      ReaderModule.of<Env, string>(`v${x}`)
    );

    expect(mapped.run(env)).toBe(6);
    expect(chained.run(env)).toBe("v6");

    const fab = ReaderModule.of<Env, (x: number) => number>((x) => x * 10);
    const applied = ReaderModule.ap(fab, r);
    expect(applied.run(env)).toBe(50);

    const viaFL = (ReaderModule as any)[fl.of]!(7);
    expect(viaFL.run(env)).toBe(7);
  });
});
