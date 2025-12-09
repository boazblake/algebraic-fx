// tests/core.runEffects.laws.test.ts
import { describe, it, expect, vi } from "vitest";
import fc from "fast-check";

import { runEffects, ioEffect, readerEffect } from "../src/core/render.ts";
import {
  IOEffectTag,
  ReaderEffectTag,
  type Effect,
} from "../src/core/types.js";
import { IO } from "../src/adt/io.js";
import { Reader } from "../src/adt/reader.js";

describe("runEffects (fast-check invariants)", () => {
  it("IOEffects run exactly once", () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        const fn = vi.fn();
        const fx = ioEffect(IO(fn));
        runEffects([fx], {}, () => {});
        expect(fn).toHaveBeenCalledTimes(1);
      })
    );
  });

  it("ReaderEffect runs Reader then IO only once", () => {
    fc.assert(
      fc.property(fc.integer(), (envVal) => {
        const fn = vi.fn();
        const reader = Reader((env: { x: number }) => IO(fn));
        const fx = readerEffect(reader);
        runEffects([fx], { x: envVal }, () => {});
        expect(fn).toHaveBeenCalledTimes(1);
      })
    );
  });

  it("Effect<Env,Msg>.run(env,dispatch) is called exactly once", () => {
    fc.assert(
      fc.property(fc.integer(), (val) => {
        const run = vi.fn();
        const fx: Effect<{ x: number }, any> = {
          run: (env) => {
            run(env.x);
          },
        };

        const dispatch = () => {};
        runEffects([{ run: fx.run }], { x: val }, dispatch);

        expect(run).toHaveBeenCalledTimes(1);
        expect(run).toHaveBeenCalledWith(val);
      })
    );
  });

  it("runEffects([]) is a no-op", () => {
    const dispatch = vi.fn();
    runEffects([], {}, dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("runEffects(effects ++ []) = runEffects(effects)", () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), { maxLength: 5 }), (vals) => {
        const calls1: number[] = [];
        const calls2: number[] = [];

        const mk = (n: number) =>
          ioEffect(
            IO(() => {
              calls1.push(n);
            })
          );

        const mk2 = (n: number) =>
          ioEffect(
            IO(() => {
              calls2.push(n);
            })
          );

        const fx = vals.map(mk);
        const fx2 = vals.map(mk2);

        runEffects(fx, {}, () => {});
        runEffects([...fx2, ...[]], {}, () => {});

        expect(calls1).toEqual(vals);
        expect(calls2).toEqual(vals);
      })
    );
  });
});
