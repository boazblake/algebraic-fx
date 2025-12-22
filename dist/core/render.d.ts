import type { Program } from "./types.js";
/**
 * Renderer function.
 *
 * A renderer reconciles a virtual DOM tree into a concrete DOM subtree.
 */
export type Renderer = (root: Element, vnode: any) => void;
/**
 * renderApp
 *
 * Start an algebraic-fx application runtime loop.
 *
 * Responsibilities:
 * - run init once
 * - render view on init and after every update
 * - run Cmd effects returned by init/update via runEffects
 * - manage subscription lifecycle via Program.subs(model)
 *
 * IMPORTANT:
 * - update must be pure (no direct side effects)
 * - all side effects must be described as Cmd effects (init/update)
 * - all long-lived behavior must be described as Subscriptions (subs)
 */
export declare const renderApp: <M, Msg, Env>(root: Element, program: Program<M, Msg, Env>, env: Env, renderer: Renderer) => void;
//# sourceMappingURL=render.d.ts.map