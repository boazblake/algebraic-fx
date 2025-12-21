import type { Program } from "./types.js";
/**
 * Renderer function.
 *
 * A renderer reconciles a virtual DOM tree into a concrete DOM subtree.
 *
 * algebraic-fx does not prescribe a renderer implementation.
 * The default renderer is `render` from `core/mithril-lite.ts`.
 */
export type Renderer = (root: Element, vnode: any) => void;
/**
 * Start an algebraic-fx application.
 *
 * This is the **only imperative runtime loop** in the framework.
 *
 * Responsibilities:
 *  - execute `Program.init` exactly once
 *  - render the initial view
 *  - handle `dispatch(msg)` → update → view
 *  - interpret one-shot effects (Cmd)
 *  - manage subscription lifecycle (Sub)
 *
 * IMPORTANT SEMANTICS:
 *  - `renderApp` is NOT curried
 *  - `renderApp` does NOT return an IO
 *  - the runtime starts immediately
 *
 * Subscription semantics (Elm-style):
 *  - subscriptions are keyed
 *  - started once per key
 *  - cleaned up automatically when removed
 *
 * @param root Root DOM element
 * @param program Application Program definition
 * @param env Runtime environment
 * @param renderer Virtual DOM renderer
 */
export declare const renderApp: <M, Msg, Env>(root: Element, program: Program<M, Msg, Env>, env: Env, renderer: Renderer) => void;
//# sourceMappingURL=render.d.ts.map