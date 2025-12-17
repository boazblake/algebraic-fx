import { describe, it, expect, vi } from "vitest";
import { runEffects, fx, interpretRawEffect } from "@/core/effects";
import { IO } from "@/adt/io";
import { Reader } from "@/adt/reader";
import { TaskModule } from "@/adt/task";

describe("Effect runtime", () => {
  it("runs IO", () => {
    const fn = vi.fn();
    const eff = IO(() => fn());
    runEffects({}, () => {}, [eff]);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("runs Reader<IO>", () => {
    const fn = vi.fn();
    const eff = Reader((env: { x: number }) => IO(() => fn(env.x)));
    runEffects({ x: 10 }, () => {}, [eff]);
    expect(fn).toHaveBeenCalledWith(10);
  });

  it("runs custom Effect and collects cleanup", () => {
    const runFn = vi.fn();
    const cleanupFn = vi.fn();

    const eff = fx((env, dispatch) => {
      runFn(env.x);
      return cleanupFn;
    });

    const dispose = runEffects({ x: 5 }, () => {}, [eff]);
    expect(runFn).toHaveBeenCalledWith(5);

    dispose();
    expect(cleanupFn).toHaveBeenCalledTimes(1);
  });

  it("runs Task and dispatches Right value", async () => {
    const dispatch = vi.fn();

    // Task.of returns a Task<E,A>
    const t = TaskModule.of<never, number>(5);

    runEffects({}, dispatch, [t]);

    // allow microtask queue to flush
    await Promise.resolve();
    await Promise.resolve();

    expect(dispatch).toHaveBeenCalledWith(5);
  });

  it("ignores falsy effects", () => {
    expect(() =>
      runEffects({}, () => {}, [null as any, undefined as any])
    ).not.toThrow();
  });
});
