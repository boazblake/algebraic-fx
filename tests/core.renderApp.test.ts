import { describe, it, expect } from "vitest";
import { renderApp } from "../src/core/render.js";
import type {
  Program,
  RawEffect,
  Effect,
  Dispatch,
  Payload,
} from "../src/core/types.js";
import { IO } from "../src/adt/io.js";

type Env = { tag: string };

type Msg =
  | Payload<"Init">
  | Payload<"Click">
  | Payload<"SetText", { text: string }>;

type Model = {
  text: string;
  log: string[];
};

describe("renderApp", () => {
  const mkProgram = (): Program<Model, Msg, Env> => {
    return {
      init: IO(() => ({
        model: {
          text: "hello",
          log: ["init"],
        },
        effects: [],
      })),
      update: (msg, model): { model: Model; effects: RawEffect<Env>[] } => {
        switch (msg.type) {
          case "Click": {
            return {
              model: {
                ...model,
                text: model.text.toUpperCase(),
                log: [...model.log, "Click"],
              },
              effects: [],
            };
          }
          case "SetText": {
            return {
              model: {
                ...model,
                text: msg.msg.text,
                log: [...model.log, "SetText"],
              },
              effects: [],
            };
          }
          default:
            return { model, effects: [] };
        }
      },
      view: (model, dispatch) => {
        return {
          tag: "button",
          props: {
            onclick: () => dispatch({ type: "Click", msg: {} }),
          },
          children: [model.text],
          key: undefined,
        };
      },
    };
  };

  const createRenderer = () => {
    const renders: any[] = [];
    const renderer = (root: Element, vnode: any) => {
      (root as any).__lastVNode = vnode;
      renders.push(vnode);
    };
    return { renderer, renders };
  };

  it("runs init and renders once", () => {
    const root = document.createElement("div");
    const program = mkProgram();
    const { renderer, renders } = createRenderer();

    renderApp<Model, Msg, Env>(root, program, { tag: "env" }, renderer);

    expect(renders.length).toBe(1);
    const vnode = (root as any).__lastVNode;
    expect(vnode.children[0]).toBe("hello");
  });

  it("dispatch flows through update and view", () => {
    const root = document.createElement("div");
    const program = mkProgram();
    const { renderer, renders } = createRenderer();

    const env: Env = { tag: "env" };

    renderApp<Model, Msg, Env>(root, program, env, renderer);

    const vnode = (root as any).__lastVNode;
    const onclick = vnode.props.onclick as () => void;

    onclick();

    expect(renders.length).toBe(2);
    const vnode2 = (root as any).__lastVNode;
    expect(vnode2.children[0]).toBe("HELLO");
  });

  it("supports effects that dispatch follow-up messages", () => {
    const root = document.createElement("div");
    const effectsRun: string[] = [];

    const program: Program<Model, Msg, Env> = {
      init: IO(() => ({
        model: { text: "start", log: [] },
        effects: [],
      })),
      update: (msg, model): { model: Model; effects: RawEffect<Env>[] } => {
        if (msg.type === "Init") {
          const fx: Effect<Env, Msg> = {
            run(env, dispatchInner) {
              effectsRun.push(`env:${env.tag}`);
              dispatchInner({
                type: "SetText",
                msg: { text: "from effect" },
              });
            },
          };
          return { model, effects: [fx] };
        }
        if (msg.type === "SetText") {
          return {
            model: { ...model, text: msg.msg.text },
            effects: [],
          };
        }
        return { model, effects: [] };
      },
      view: (model, dispatch) => ({
        tag: "div",
        props: {
          onclick: () => dispatch({ type: "Init", msg: {} }),
        },
        children: [model.text],
        key: undefined,
      }),
    };

    const { renderer } = createRenderer();
    const env: Env = { tag: "TEST" };

    renderApp<Model, Msg, Env>(root, program, env, renderer);

    let vnode = (root as any).__lastVNode;
    const onclick = vnode.props.onclick as () => void;

    onclick(); // dispatch Init → triggers Effect

    vnode = (root as any).__lastVNode;
    expect(vnode.children[0]).toBe("from effect");
    expect(effectsRun).toEqual(["env:TEST"]);
  });
});
