import { IO } from "../adt/io.js";
import type { Program } from "./types.js";
import type { DomEnv } from "./dom-env.js";
/**
 * A DOM renderer function.
 *
 * The renderer is responsible for:
 * - receiving a root DOM element
 * - receiving a virtual node (vnode)
 * - updating the DOM to reflect the vnode
 *
 * Compatible with `mithril-lite` and similar virtual DOM renderers.
 *
 * @param root Root DOM element to render into
 * @param vnode Virtual node tree to render
 */
export type Renderer = (root: Element, vnode: any) => void;
/**
 * Connects a `Program<M, P, E>` to a DOM renderer and environment, producing
 * an `IO` that, when executed, starts the application runtime.
 *
 * The runtime:
 * - runs `program.init` to obtain the initial model and effects
 * - renders the view via the provided `renderer`
 * - executes effects (`IOEffect`, `ReaderEffect`, or legacy `EffectLike`)
 * - batches dispatches using `requestAnimationFrame`
 *
 * @typeParam M Model type
 * @typeParam P Payload/message type
 *
 * @param renderer Rendering function that updates the DOM
 * @param env Environment used by `Reader<DomEnv, IO<void>>` effects
 *
 * @returns Function that, given a root `IO<Element>` and a `Program`,
 *          produces an `IO` which starts the program when run.
 */
export declare const renderApp: (renderer: Renderer, env?: DomEnv) => <M, P>(
/**
 * An `IO` that yields the root DOM element to render into.
 */
rootIO: IO<Element>, 
/**
 * The program definition (init, update, view).
 */
program: Program<M, P, DomEnv>) => IO<{
    /**
     * Enqueue a payload for processing by `program.update`.
     * Dispatches are batched and processed on the next animation frame.
     */
    dispatch: (payload: P) => void;
    /**
     * Retrieve the current model, or `undefined` if not yet initialized.
     */
    getModel: () => M | undefined;
    /**
     * Stop the runtime:
     * - prevents new dispatches from being processed
     * - clears the pending queue
     * - prevents further rendering or effect execution
     *
     * Safe to call multiple times.
     */
    destroy: () => void;
}>;
//# sourceMappingURL=render.d.ts.map