import { describe, it, expect, vi } from "vitest";
import { renderApp } from "@/core/render";
import { IO } from "@/adt/io";
import { fx } from "@/core/effects";

type Msg = "PING" | "PONG";

const makeRoot = () => document.createElement("div");

describe("renderApp (integration shape)", () => {
  it("runs init and renders once", () => {
    const root = makeRoot();
    const renderer = vi.fn();

    const program = {
      init: IO(() => ({
        model: { count: 0 },
        effects: [] as any[],
      })),
      update: vi.fn(
        (msg: Msg, model: { count: number }, _dispatch: (m: Msg) => void) => {
          if (msg === "PING") {
            return {
              model: { count: model.count + 1 },
              effects: [] as any[],
            };
          }
          return { model, effects: [] as any[] };
        }
      ),
      view: vi.fn((model: { count: number }, _dispatch: (m: Msg) => void) => ({
        tag: "div",
        attrs: { "data-count": model.count },
      })),
    };

    renderApp(root, program as any, {}, renderer);

    expect(program.view).toHaveBeenCalledTimes(1);
    expect(renderer).toHaveBeenCalledTimes(1);
  });

  it("dispatch flows through update and view", () => {
    const root = makeRoot();
    const renderer = vi.fn();

    let capturedDispatch: ((m: Msg) => void) | null = null;

    const program = {
      init: IO(() => ({
        model: { count: 0 },
        effects: [] as any[],
      })),
      update: vi.fn(
        (msg: Msg, model: { count: number }, _dispatch: (m: Msg) => void) => ({
          model: { count: model.count + 1 },
          effects: [] as any[],
        })
      ),
      view: vi.fn((model: { count: number }, dispatch: (m: Msg) => void) => {
        capturedDispatch = dispatch;
        return {
          tag: "div",
          attrs: { "data-count": model.count },
        };
      }),
    };

    renderApp(root, program as any, {}, renderer);

    const dispatch = capturedDispatch as (m: Msg) => void;
    dispatch("PING");

    expect(program.update).toHaveBeenCalledWith(
      "PING",
      { count: 0 },
      expect.any(Function)
    );
    expect(program.view).toHaveBeenCalledTimes(2);
    expect(renderer).toHaveBeenCalledTimes(2);
  });

  it("supports effects that dispatch follow-up messages", () => {
    const root = makeRoot();
    const renderer = vi.fn();

    let capturedDispatch: ((m: Msg) => void) | null = null;

    const program = {
      init: IO(() => ({
        model: { count: 0 },
        effects: [] as any[],
      })),
      update: vi.fn(
        (msg: Msg, model: { count: number }, _dispatch: (m: Msg) => void) => {
          if (msg === "PING") {
            const eff = fx((_env: unknown, dispatch: (m: Msg) => void) => {
              dispatch("PONG");
            });

            return {
              model,
              effects: [eff] as any[],
            };
          }

          if (msg === "PONG") {
            return {
              model: { count: model.count + 1 },
              effects: [] as any[],
            };
          }

          return { model, effects: [] as any[] };
        }
      ),
      view: vi.fn((model: { count: number }, dispatch: (m: Msg) => void) => {
        capturedDispatch = dispatch;
        return {
          tag: "div",
          attrs: { "data-count": model.count },
        };
      }),
    };

    renderApp(root, program as any, {}, renderer);

    const dispatch = capturedDispatch as (m: Msg) => void;
    dispatch("PING");

    // PING update
    expect(program.update).toHaveBeenCalledWith(
      "PING",
      { count: 0 },
      expect.any(Function)
    );

    // PONG follow-up from effect
    expect(program.update).toHaveBeenCalledWith(
      "PONG",
      { count: 0 },
      expect.any(Function)
    );

    // One increment from PONG
    const lastCall = program.view.mock.calls.at(-1);
    expect(lastCall?.[0]).toEqual({ count: 1 });
  });
});
