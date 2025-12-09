import { describe, it, expect } from "vitest";
import {
  renderApp,
  runEffects,
  ioEffect,
  readerEffect,
} from "../src/core/render.js";
import { IO } from "../src/adt/io.js";
import { Reader } from "../src/adt/reader.js";

describe("runEffects", () => {
  it("validates dispatch parameter", () => {
    expect(() => {
      runEffects([], {}, null as any);
    }).toThrow("dispatch must be a function");
  });

  it("handles empty effects array", () => {
    const dispatch = () => {};
    expect(() => {
      runEffects([], {}, dispatch);
    }).not.toThrow();
  });

  it("runs IOEffect", () => {
    let ran = false;
    const io = IO(() => {
      ran = true;
    });
    const effect = ioEffect(io);

    runEffects([effect], {}, () => {});
    expect(ran).toBe(true);
  });

  it("runs ReaderEffect", () => {
    let value = 0;
    const reader = Reader((env: { x: number }) =>
      IO(() => {
        value = env.x;
      })
    );
    const effect = readerEffect(reader);

    runEffects([effect], { x: 42 }, () => {});
    expect(value).toBe(42);
  });

  it("runs Effect with dispatch", () => {
    let dispatchedMsg: string | null = null;
    const effect = {
      run: (env: any, dispatch: any) => {
        dispatch("test-message");
      },
    };

    runEffects([effect], {}, (msg) => {
      dispatchedMsg = msg;
    });

    expect(dispatchedMsg).toBe("test-message");
  });

  it("handles async effects", async () => {
    let resolved = false;
    const effect = {
      run: async () => {
        await new Promise((r) => setTimeout(r, 10));
        resolved = true;
      },
    };

    runEffects([effect], {}, () => {});

    // Give async effect time to complete
    await new Promise((r) => setTimeout(r, 20));
    expect(resolved).toBe(true);
  });

  it("catches and logs effect errors", () => {
    const consoleError = console.error;
    let errorLogged = false;
    console.error = () => {
      errorLogged = true;
    };

    const effect = {
      run: () => {
        throw new Error("Effect error");
      },
    };

    expect(() => {
      runEffects([effect], {}, () => {});
    }).not.toThrow();

    expect(errorLogged).toBe(true);
    console.error = consoleError;
  });
});

describe("renderApp", () => {
  it("validates root parameter", () => {
    expect(() => {
      renderApp(null as any, {} as any, {}, () => {});
    }).toThrow("root element is required");
  });

  it("validates program parameter", () => {
    const root = document.createElement("div");
    expect(() => {
      renderApp(root, null as any, {}, () => {});
    }).toThrow("program is required");
  });

  it("validates program.init", () => {
    const root = document.createElement("div");
    const badProgram = { update: () => {}, view: () => {} } as any;

    expect(() => {
      renderApp(root, badProgram, {}, () => {});
    }).toThrow("program.init must be an IO");
  });

  it("runs complete init -> render -> effects cycle", () => {
    const root = document.createElement("div");
    let effectRan = false;
    let renderCount = 0;

    const program = {
      init: IO(() => ({
        model: { count: 0 },
        effects: [
          {
            run: () => {
              effectRan = true;
            },
          },
        ],
      })),
      update: (msg: any, model: any) => ({
        model: { count: model.count + 1 },
        effects: [],
      }),
      view: (model: any, dispatch: any) => {
        renderCount++;
        return { tag: "div", children: [model.count] };
      },
    };

    const renderer = (root: any, vnode: any) => {
      // Mock renderer
    };

    renderApp(root, program, {}, renderer);

    expect(effectRan).toBe(true);
    expect(renderCount).toBe(1);
  });
});
