import { describe, it, expect, vi } from "vitest";
import { runEffects, fx } from "@/core/effects";
import { IO } from "@/adt/io";
import { Reader } from "@/adt/reader";

describe("runEffects invariants", () => {
  it("IO runs exactly once", () => {
    const fn = vi.fn();
    const eff = IO(() => fn());
    runEffects({}, () => {}, [eff]);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("Reader<IO> runs exactly once", () => {
    const fn = vi.fn();
    const eff = Reader((env: { v: number }) => IO(() => fn(env.v)));
    runEffects({ v: 3 }, () => {}, [eff]);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("Effect.run(env,dispatch) is called exactly once", () => {
    const runFn = vi.fn();
    const eff = fx(() => runFn());
    runEffects({}, () => {}, [eff]);
    expect(runFn).toHaveBeenCalledTimes(1);
  });

  it("runEffects([]) is a no-op", () => {
    const dispatch = vi.fn();
    runEffects({}, dispatch, []);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("runEffects(effects ++ []) = runEffects(effects)", () => {
    const fn = vi.fn();
    const e = fx(() => fn());

    runEffects({}, () => {}, [e]);
    runEffects({}, () => {}, [e, ...[]]);

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
