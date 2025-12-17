import { describe, it, expect, vi } from "vitest";
import { renderApp } from "@/core/render";
import { IO } from "@/adt/io";
import { fx } from "@/core/effects";

type Msg = "INC" | "TRIGGER_EFFECT" | "FOLLOW_UP";

const makeRoot = () => document.createElement("div");

describe("renderApp", () => {
  it("runs init and renders once", () => {
    const root = makeRoot();
    const renderer = vi.fn();

    const program = {
      init: IO(() => ({
        model: 0,
        effects: [] as any[],
      })),
      update: vi.fn(
        (_msg: Msg, model: number, _dispatch: (m: Msg) => void) => ({
          model: model + 1,
          effects: [] as any[],
        })
      ),
      view: vi.fn((model: number, _dispatch: (m: Msg) => void) => {
        return { tag: "div", attrs: { "data-model": model } };
      }),
    };

    renderApp(root, program as any, {}, renderer);

    expect(program.init.run).toBeTypeOf("function");
    expect(program.view).toHaveBeenCalledTimes(1);
    expect(renderer).toHaveBeenCalledTimes(1);
    expect(program.view).toHaveBeenCalledWith(0, expect.any(Function));
  });

  it("dispatch triggers update → view → renderer", () => {
    const root = makeRoot();
    const renderer = vi.fn();

    let capturedDispatch: ((m: Msg) => void) | null = null;

    const program = {
      init: IO(() => ({
        model: 0,
        effects: [] as any[],
      })),
      update: vi.fn((msg: Msg, model: number, _dispatch: (m: Msg) => void) => ({
        model: model + 1,
        effects: [] as any[],
      })),
      view: vi.fn((model: number, dispatch: (m: Msg) => void) => {
        capturedDispatch = dispatch;
        return { tag: "div", attrs: { "data-model": model } };
      }),
    };

    renderApp(root, program as any, {}, renderer);

    expect(capturedDispatch).toBeTypeOf("function");

    (capturedDispatch as (m: Msg) => void)("INC");

    expect(program.update).toHaveBeenCalledTimes(1);
    expect(program.update).toHaveBeenCalledWith("INC", 0, expect.any(Function));
    expect(program.view).toHaveBeenCalledTimes(2);
    expect(renderer).toHaveBeenCalledTimes(2);
  });

  it("effects returned from update are interpreted and can dispatch", () => {
    const root = makeRoot();
    const renderer = vi.fn();
    const effectBody = vi.fn();

    let capturedDispatch: ((m: Msg) => void) | null = null;

    const program = {
      init: IO(() => ({
        model: 0,
        effects: [] as any[],
      })),
      update: vi.fn((msg: Msg, model: number, _dispatch: (m: Msg) => void) => {
        if (msg === "TRIGGER_EFFECT") {
          const eff = fx((env: unknown, dispatch: (m: Msg) => void) => {
            effectBody(env);
            dispatch("FOLLOW_UP");
          });

          return {
            model,
            effects: [eff] as any[],
          };
        }

        // FOLLOW_UP or others just bump model
        return {
          model: model + 1,
          effects: [] as any[],
        };
      }),
      view: vi.fn((model: number, dispatch: (m: Msg) => void) => {
        capturedDispatch = dispatch;
        return { tag: "div", attrs: { "data-model": model } };
      }),
    };

    const env = { foo: 42 };

    renderApp(root, program as any, env, renderer);

    const dispatch = capturedDispatch as (m: Msg) => void;
    dispatch("TRIGGER_EFFECT");

    // First update: TRIGGER_EFFECT with initial model
    expect(program.update).toHaveBeenCalledWith(
      "TRIGGER_EFFECT",
      0,
      expect.any(Function)
    );

    // Effect should have run with env and dispatched FOLLOW_UP
    expect(effectBody).toHaveBeenCalledWith(env);

    // Second update: FOLLOW_UP with same model (0) then incremented
    expect(program.update).toHaveBeenCalledWith(
      "FOLLOW_UP",
      0,
      expect.any(Function)
    );

    // We should have rendered three times:
    //  - initial
    //  - after TRIGGER_EFFECT
    //  - after FOLLOW_UP
    expect(renderer).toHaveBeenCalledTimes(3);
  });
});
