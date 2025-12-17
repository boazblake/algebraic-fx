// tests/adt.writer-task.laws.test.ts
import { describe, it, expect } from "vitest";
import { monoidArray } from "../src/adt/monoid";
import { WriterTaskModule } from "../src/adt/writer-task";

describe("WriterTask - functor laws (value only)", () => {
  const M = monoidArray<string>();
  const W = WriterTaskModule(M);

  // specialize to E = never for these laws
  const of = <A>(a: A) => W.of<never, A>(a);
  const map = W.map;

  it("map identity", async () => {
    const wt = of(42);
    const wt2 = map<never, number, number>(wt, (x) => x);

    const res1: any = await wt.runTask.run();
    const res2: any = await wt2.runTask.run();

    expect(res1._tag).toBe("Right");
    expect(res2._tag).toBe("Right");
    expect(res2.right).toEqual(res1.right);
  });

  it("map composition", async () => {
    const f = (n: number) => n + 1;
    const g = (n: number) => n * 2;

    const wt = of(10);

    const left = map<never, number, number>(
      map<never, number, number>(wt, f),
      g
    );
    const right = map<never, number, number>(wt, (x) => g(f(x)));

    const lRes: any = await left.runTask.run();
    const rRes: any = await right.runTask.run();

    expect(lRes._tag).toBe("Right");
    expect(rRes._tag).toBe("Right");
    expect(lRes.right).toEqual(rRes.right);
  });
});
