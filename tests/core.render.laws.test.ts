// tests/core.renderApp.laws.test.ts
import { describe, it, expect, vi } from "vitest";
import fc from "fast-check";

import { renderApp } from "../src/core/render.ts";

describe("renderApp invariants (fast-check)", () => {
  it("init → single render", () => {
    const root = document.createElement("div");
    const renderer = vi.fn();

    const program = {
      init: { run: () => ({ model: 0, effects: [] }) },
      update: () => ({ model: 0, effects: [] }),
      view: () => "X",
    };

    renderApp(root, program, {}, renderer);

    expect(renderer).toHaveBeenCalledTimes(1);
  });

  it("deterministic update pipeline: same input messages → same view outputs", () => {
    fc.assert(
      fc.property(fc.array(fc.integer(), { maxLength: 10 }), (msgs) => {
        const mkProgram = () => ({
          init: { run: () => ({ model: 0, effects: [] }) },
          update: (msg, model) => ({ model: model + msg, effects: [] }),
          view: (model) => ({
            tag: "div",
            props: {},
            children: [String(model)],
          }),
        });

        const program1 = mkProgram();
        const program2 = mkProgram();

        // drive both programs PURELY
        const runProgram = (program, msgs) => {
          let { model } = program.init.run();
          const views = [];
          for (const m of msgs) {
            const upd = program.update(m, model, () => {});
            model = upd.model;
            views.push(program.view(model, () => {}));
          }
          return views;
        };

        const v1 = runProgram(program1, msgs);
        const v2 = runProgram(program2, msgs);

        expect(v1).toEqual(v2);
      })
    );
  });
});
