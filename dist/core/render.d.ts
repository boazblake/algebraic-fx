import { IO } from "../adt/io.js";
import type { Program } from "./types.js";
import type { DomEnv } from "./dom-env.js";
/**
 * Application runtime for algebraic-fx.
 *
 * `renderApp(renderer)` constructs a runtime loop that:
 *  - runs program.init to obtain the initial model + effects
 *  - renders a vnode tree via the provided renderer
 *  - executes RawEffects (IO, Reader, EffectLike)
 *  - batches dispatches using requestAnimationFrame
 *
 * This module is renderer-agnostic. The user provides the renderer function.
 */
/**
 * Renderer function type.
 *
 * The renderer is responsible for:
 * - receiving a root DOM node
 * - receiving a vnode
 * - updating the DOM
 *
 * mithril-lite provides a compatible renderer.
 */
export type Renderer = (root: Element, vnode: any) => void;
/**
 * Connects a Program<M,P,E> to a DOM renderer and environment.
 *
 * @param renderer Rendering function
 * @param env Environment used by Reader<E,IO<void>> effects
 *
 * @returns IO(run) that, when executed, starts the program.
 *
 * Responsibilities:
 *  - invoke program.init to obtain initial model & effects
 *  - render view(model)
 *  - run effects
 *  - process dispatches in RAF batches
 *  - expose { dispatch, getModel, destroy }
 *
 * `dispatch` queues messages and triggers the update cycle.
 */
export declare const renderApp: (renderer: Renderer, env?: DomEnv) => <M, P>(rootIO: IO<Element>, program: Program<M, P, DomEnv>) => IO<{
    dispatch: (payload: P) => void;
    getModel: () => M | undefined;
    destroy: () => void;
}>;
//# sourceMappingURL=render.d.ts.map