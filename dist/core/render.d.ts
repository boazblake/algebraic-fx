/**
 * Application runtime for algebraic-fx.
 *
 * This module defines the imperative runtime loop that executes a pure
 * Program<M, Msg, Env>.
 *
 * Responsibilities:
 *  - Execute Program.init exactly once
 *  - Render the initial virtual DOM
 *  - Process dispatch(msg) → update → view
 *  - Interpret and execute RawEffect values
 *
 * This file contains the ONLY imperative control flow in an algebraic-fx app.
 * Programs themselves remain pure.
 */
import type { Program } from "./types.js";
/**
 * Renderer function.
 *
 * A renderer reconciles a virtual DOM tree into a concrete DOM subtree.
 *
 * algebraic-fx does not prescribe a renderer implementation.
 * The default renderer is mithril-lite (`render` from core/mithril-lite.ts).
 */
export type Renderer = (root: Element, vnode: any) => void;
/**
 * Start an algebraic-fx application.
 *
 * This function wires together:
 *  - a Program (init / update / view)
 *  - a renderer
 *  - an environment value
 *
 * IMPORTANT SEMANTICS:
 *  - This function is NOT curried.
 *  - This function does NOT return an IO.
 *  - The runtime starts immediately.
 *
 * @param root Root DOM element to render into
 * @param program Application Program definition
 * @param env Environment value passed to effects
 * @param renderer Virtual DOM renderer
 *
 * @throws TypeError if any required argument is missing or invalid
 */
export declare const renderApp: <M, Msg, Env>(root: Element, program: Program<M, Msg, Env>, env: Env, renderer: Renderer) => void;
//# sourceMappingURL=render.d.ts.map