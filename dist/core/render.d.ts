/**
 * Runtime loop wiring Program<M, Msg, Env> to a renderer and environment.
 *
 * Responsibilities:
 *  - run Program.init
 *  - render initial view
 *  - process dispatch(msg) → update → view → effects
 *  - execute RawEffect via interpreter in effects.ts
 */
import type { Program } from "./types.js";
/**
 * Renderer function type.
 *
 * User supplies a function that updates the DOM from a VNode tree.
 */
export type Renderer = (root: Element, vnode: any) => void;
/**
 * Connect Program<M, Msg, Env> to a renderer and environment.
 */
export declare const renderApp: <M, Msg, Env>(root: Element, program: Program<M, Msg, Env>, env: Env, renderer: Renderer) => void;
//# sourceMappingURL=render.d.ts.map