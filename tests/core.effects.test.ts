import { describe, it, expect, vi } from "vitest";
import { runEffects, ioEffect, readerEffect } from "../src/core/render.js";
import {
  type Effect,
  type RawEffect,
  type IOEffect,
  type ReaderEffect,
  type Dispatch,
  type Payload,
} from "../src/core/types.js";
import { IO } from "../src/adt/io.js";
import { Reader } from "../src/adt/reader.js";

type Env = { value: number };

type Msg =
  | Payload<"Test.Log", { value: number }>
  | Payload<"Test.Inc", { value: number }>;

describe("Effect runtime", () => {
  it("runs IOEffect", () => {
    const log = vi.fn();

    const io = IO<void>(() => {
      log("ran");
    });

    const effects: RawEffect<Env>[] = [ioEffect(io)];

    const env: Env = { value: 42 };
    const dispatch: Dispatch<Msg> = () => {};

    runEffects<Env, Msg>(effects, env, dispatch);

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith("ran");
  });

  it("runs ReaderEffect", () => {
    const log = vi.fn();

    const reader = Reader<Env, IO<void>>((env) =>
      IO(() => {
        log(env.value);
      })
    );

    const effects: RawEffect<Env>[] = [readerEffect(reader)];

    const env: Env = { value: 99 };
    const dispatch: Dispatch<Msg> = () => {};

    runEffects<Env, Msg>(effects, env, dispatch);

    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(99);
  });

  it("runs custom Effect<Env,Msg>", () => {
    const log = vi.fn();
    const dispatched: Msg[] = [];

    const fx: Effect<Env, Msg> = {
      run(env, dispatch) {
        log(env.value);
        dispatch({
          type: "Test.Inc",
          msg: { value: env.value + 1 },
        });
      },
    };

    const effects: RawEffect<Env>[] = [fx];
    const env: Env = { value: 10 };
    const dispatch: Dispatch<Msg> = (m) => dispatched.push(m);

    runEffects<Env, Msg>(effects, env, dispatch);

    expect(log).toHaveBeenCalledWith(10);
    expect(dispatched).toEqual([{ type: "Test.Inc", msg: { value: 11 } }]);
  });

  it("ignores falsy effects", () => {
    const effects: RawEffect<Env>[] = [
      null as unknown as RawEffect<Env>,
      undefined as unknown as RawEffect<Env>,
    ];
    const env: Env = { value: 0 };
    const dispatch: Dispatch<Msg> = () => {};

    expect(() => runEffects<Env, Msg>(effects, env, dispatch)).not.toThrow();
  });
});
