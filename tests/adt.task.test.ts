import { describe, it, expect } from "vitest";
import Task from "../src/adt/task.js";
import { Left, Right, isLeft, isRight } from "../src/adt/either.js";

describe("Task", () => {
  it("run() returns Right on success", async () => {
    const t = Task<never, number>(() => Promise.resolve(Right(5)));
    const res = await t.run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toBe(5);
  });

  it("run() returns Left on failure", async () => {
    const t = Task<string, number>(() => Promise.resolve(Left("err")));
    const res = await t.run();
    expect(isLeft(res)).toBe(true);
    if (isLeft(res)) expect(res.left).toBe("err");
  });

  it("runWith(signal) requires an AbortSignal", async () => {
    const t = Task<never, number>(() => Promise.resolve(Right(1)));
    expect(() => t.runWith(undefined as any)).toThrow();
  });

  it("runWith respects abort", async () => {
    const t = Task<string, number>((signal?: AbortSignal) => {
      return new Promise((resolve) => {
        const id = setTimeout(() => resolve(Right(1)), 50);

        signal?.addEventListener(
          "abort",
          () => {
            clearTimeout(id);
            resolve(Left("aborted"));
          },
          { once: true }
        );
      });
    });

    const controller = new AbortController();
    const p = t.runWith(controller.signal);
    controller.abort();

    const res = await p;
    expect(isLeft(res)).toBe(true);
    if (isLeft(res)) expect(res.left).toBe("aborted");
  });

  it("map transforms successful values", async () => {
    const t = Task<never, number>(() => Promise.resolve(Right(2)));
    const m = t.map((x) => x + 1);

    const res = await m.run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toBe(3);
  });

  it("map preserves failures", async () => {
    const t = Task<string, number>(() => Promise.resolve(Left("err")));
    const m = t.map((x) => x + 1);

    const res = await m.run();
    expect(isLeft(res)).toBe(true);
  });

  it("chain sequences tasks", async () => {
    const t = Task<never, number>(() => Promise.resolve(Right(2)));
    const c = t.chain((x) =>
      Task<never, number>(() => Promise.resolve(Right(x * 3)))
    );

    const res = await c.run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toBe(6);
  });

  it("chain short-circuits on Left", async () => {
    const t = Task<string, number>(() => Promise.resolve(Left("fail")));
    const c = t.chain((x) => Task(() => Promise.resolve(Right(x + 1))));

    const res = await c.run();
    expect(isLeft(res)).toBe(true);
    if (isLeft(res)) expect(res.left).toBe("fail");
  });

  it("ap applies wrapped function to wrapped value", async () => {
    const tf = Task<never, (n: number) => number>(() =>
      Promise.resolve(Right((n) => n * 2))
    );
    const tv = Task<never, number>(() => Promise.resolve(Right(3)));

    const app = tv.ap(tf);
    const res = await app.run();

    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toBe(6);
  });

  it("mapError transforms only the error", async () => {
    const t = Task<string, number>(() => Promise.resolve(Left("oops")));
    const m = t.mapError((e) => e.toUpperCase());

    const res = await m.run();
    expect(isLeft(res)).toBe(true);
    if (isLeft(res)) expect(res.left).toBe("OOPS");
  });

  it("bimap transforms both sides", async () => {
    const te = Task<string, number>(() => Promise.resolve(Left("x")));
    const tr = Task<string, number>(() => Promise.resolve(Right(1)));

    const e2 = await te
      .bimap(
        (e) => e + "!",
        (_) => -999
      )
      .run();
    const r2 = await tr
      .bimap(
        (_) => "nope",
        (n) => n + 10
      )
      .run();

    expect(isLeft(e2)).toBe(true);
    if (isLeft(e2)) expect(e2.left).toBe("x!");

    expect(isRight(r2)).toBe(true);
    if (isRight(r2)) expect(r2.right).toBe(11);
  });

  it("Task.of creates Right", async () => {
    const t = Task.of(42);
    const res = await t.run();

    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toBe(42);
  });

  it("Task.reject creates Left", async () => {
    const t = Task.reject("nope");
    const res = await t.run();

    expect(isLeft(res)).toBe(true);
    if (isLeft(res)) expect(res.left).toBe("nope");
  });

  it("taskFromAbortable resolves correctly", async () => {
    const t = Task.fromAbortable(
      async (_signal) => 10,
      () => "err"
    );

    const res = await t.run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toBe(10);
  });

  it("Task.tryCatch catches exceptions into Left", async () => {
    const t = Task.tryCatch(() => Promise.reject("bad"));

    const res = await t.run();
    expect(isLeft(res)).toBe(true);
  });

  it("Task.tryCatchK maps errors", async () => {
    const t = Task.tryCatchK(
      () => Promise.reject("bad"),
      (e) => e + "!"
    );

    const res = await t.run();
    expect(isLeft(res)).toBe(true);
    if (isLeft(res)) expect(res.left).toBe("bad!");
  });

  it("Task.delay delays execution", async () => {
    const t = Task.of(5);
    const delayed = Task.delay(10)(t);

    const res = await delayed.run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toBe(5);
  });

  it("Task.timeout returns Left on timeout", async () => {
    const slow = Task<string, number>(
      () => new Promise((resolve) => setTimeout(() => resolve(Right(1)), 50))
    );
    const timed = Task.timeout(10, "timeout")(slow);

    const res = await timed.run();
    expect(isLeft(res)).toBe(true);
    if (isLeft(res)) expect(res.left).toBe("timeout");
  });

  it("Task.sequence runs tasks sequentially", async () => {
    const tasks = [Task.of(1), Task.of(2), Task.of(3)];

    const res = await Task.sequence(tasks).run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toEqual([1, 2, 3]);
  });

  it("Task.sequence short-circuits on Left", async () => {
    const tasks = [Task.of(1), Task.reject<number>("bad"), Task.of(3)];

    const res = await Task.sequence(tasks).run();
    expect(isLeft(res)).toBe(true);
    if (isLeft(res)) expect(res.left).toBe("bad");
  });

  it("Task.traverse maps + sequences", async () => {
    const res = await Task.traverse((x: number) => Task.of(x + 1))([
      1, 2, 3,
    ]).run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toEqual([2, 3, 4]);
  });

  it("Task.all resolves all in parallel", async () => {
    const res = await Task.all([Task.of(1), Task.of(2)]).run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toEqual([1, 2]);
  });

  it("Task.all fails if any fail", async () => {
    const res = await Task.all([Task.of(1), Task.reject("nope")]).run();

    expect(isLeft(res)).toBe(true);
  });

  it("Task.race resolves with first finisher", async () => {
    const fast = Task.of(1);
    const slow = Task<number, number>(
      () => new Promise((resolve) => setTimeout(() => resolve(Right(2)), 50))
    );

    const res = await Task.race([slow, fast]).run();
    expect(isRight(res)).toBe(true);
    if (isRight(res)) expect(res.right).toBe(1);
  });

  it("Task.fold unwraps Either", async () => {
    const t = Task.of(5);
    const f = Task.fold(
      () => 0,
      (x) => x * 2
    );

    const res = await f(t);
    expect(res).toBe(10);
  });

  it("Task.getOrElse returns fallback", async () => {
    const good = Task.of(9);
    const bad = Task.reject<number>("err");

    expect(await Task.getOrElse(0)(good)).toBe(9);
    expect(await Task.getOrElse(0)(bad)).toBe(0);
  });

  it("Task.toPromise throws on Left", async () => {
    const bad = Task.reject("oops");

    await expect(Task.toPromise(bad)).rejects.toBe("oops");
  });
});
