// tests/adt.task.test.ts
import { describe, it, expect } from "vitest";
import type { Either } from "@/adt/either";
import { left, right } from "@/adt/either";
import {
  TaskModule,
  of,
  fail,
  map,
  chain,
  ap,
  fromIO,
  fromEither,
  fromPromise,
  tryCatch,
  isTask,
  type Task,
} from "@/adt/task";
import { IO } from "@/adt/io";
import { fl } from "@/adt/fl";

const eqTask = async <E, A>(
  ta: Task<E, A>,
  tb: Task<E, A>
): Promise<boolean> => {
  const [ea, eb] = await Promise.all([ta.run(), tb.run()]);
  if (ea._tag !== eb._tag) return false;
  if (ea._tag === "Left") return Object.is(ea.left, eb.left);
  return Object.is(ea.right, eb.right);
};

describe("Task ADT", () => {
  it("constructs via of and fail", async () => {
    const t1 = of(1);
    const t2 = fail("err");

    const [r1, r2] = await Promise.all([t1.run(), t2.run()]);

    expect(r1._tag).toBe("Right");
    expect((r1 as Either<never, number>).right).toBe(1);

    expect(r2._tag).toBe("Left");
    expect((r2 as Either<string, never>).left).toBe("err");
  });

  it("map transforms the success value", async () => {
    const t = map((n: number) => n * 2)(of(2));
    const r = await t.run();
    expect(r._tag).toBe("Right");
    expect((r as Either<never, number>).right).toBe(4);
  });

  it("chain sequences computations", async () => {
    const add1 = (n: number) => of(n + 1);
    const t = chain(add1)(of(1));
    const r = await t.run();
    expect(r._tag).toBe("Right");
    expect((r as Either<never, number>).right).toBe(2);
  });

  it("ap applies a function Task to a value Task", async () => {
    const tf = of((n: number) => n + 3);
    const tv = of(4);
    const t = ap(tf)(tv);
    const r = await t.run();
    expect(r._tag).toBe("Right");
    expect((r as Either<never, number>).right).toBe(7);
  });

  it("fromIO and fromEither interop", async () => {
    const io = IO(() => 42);
    const t1 = fromIO(io);
    const t2 = fromEither<Error, number>(right(42));

    expect(await eqTask(t1, t2)).toBe(true);
  });

  it("fromPromise and tryCatch handle async errors", async () => {
    const ok = fromPromise(
      () => Promise.resolve(1),
      () => new Error("x")
    );
    const bad = fromPromise(
      () => Promise.reject("boom"),
      (e) => new Error(String(e))
    );

    const [r1, r2] = await Promise.all([ok.run(), bad.run()]);
    expect(r1._tag).toBe("Right");
    expect((r1 as Either<Error, number>).right).toBe(1);

    expect(r2._tag).toBe("Left");
    expect(String((r2 as Either<Error, never>).left.message)).toContain("boom");

    const caught = tryCatch(
      () => {
        throw new TypeError("oops");
      },
      (e) => (e instanceof Error ? e : new Error(String(e)))
    );
    const rc = await caught.run();
    expect(rc._tag).toBe("Left");
    expect((rc as Either<Error, never>).left).toBeInstanceOf(TypeError);
  });

  it("runWith sequences via callbacks", async () => {
    const t = of(10);
    const res = await t.runWith(
      () => -1,
      (n) => n * 2
    );
    expect(res).toBe(20);

    const tErr = fail("x");
    const resErr = await tErr.runWith(
      (e) => `err:${e}`,
      () => "ok"
    );
    expect(resErr).toBe("err:x");
  });

  it("isTask detects Task values", () => {
    const t = of(1);
    expect(isTask(t)).toBe(true);
    expect(isTask(42)).toBe(false);
  });

  it("exposes Fantasy-Land methods on the value", async () => {
    const j = of(2);

    const j2 = (j as any)[fl.map]((n: number) => n + 1);
    const j3 = (j2 as any)[fl.chain]((n: number) => of(n * 2));
    const jf = of((n: number) => n * 3);
    const j4 = (j3 as any)[fl.ap](jf);

    const expected = of(18); // ((2+1)*2)*3

    expect(await eqTask(j4 as any, expected)).toBe(true);
  });
  //
  // it("TaskModule exposes fp-ts style dictionary and FL.of", async () => {
  //   // fp-ts style
  //   const viaDict = TaskModule.of(7);
  //   const r = await viaDict.run();
  //   expect(r._tag).toBe("Right");
  //   expect(r.right).toBe(7);
  //
  //   // Fantasy-Land style
  //   const viaFlTask = TaskModule;
  //   const rr = await viaFlTask.run();
  //   expect(rr._tag).toBe("Right");
  //   expect(rr.right).toBe(7);
  // });
});
