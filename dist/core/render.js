import { IO } from "../adt/io.js";
import { IOEffectTag, ReaderEffectTag } from "./types.js";
import { browserEnv } from "./dom-env.js";
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
export const renderApp = (renderer, env = browserEnv()) => (
/**
 * An `IO` that yields the root DOM element to render into.
 */
rootIO, 
/**
 * The program definition (init, update, view).
 */
program) => rootIO
    .map((root) => {
    let model = undefined;
    const queue = [];
    let queued = false;
    let destroyed = false;
    /**
     * Execute a list of raw effects against the current environment.
     *
     * Handles:
     * - tagged `IOEffect`
     * - tagged `ReaderEffect<DomEnv>`
     * - legacy `EffectLike` with `run()` or `run(env)` signatures
     *
     * @param fx Optional array of effects to run
     */
    const runEffects = (fx) => {
        fx?.forEach((effect) => {
            if (!effect)
                return;
            // Tagged IOEffect
            if (effect._tag === IOEffectTag) {
                effect.io.run();
                return;
            }
            // Tagged ReaderEffect
            if (effect._tag === ReaderEffectTag) {
                const r = effect.reader;
                const io = r.run(env);
                io.run();
                return;
            }
            // Backward compat: EffectLike (IO-like) with no env
            if (typeof effect.run === "function") {
                const candidate = effect;
                // If run(env) returns an IO, treat it as Reader<E, IO<void>>
                if (candidate.run.length >= 1) {
                    const io = candidate.run(env);
                    if (io && typeof io.run === "function")
                        io.run();
                    return;
                }
                // Otherwise treat as IO<void>/EffectLike: run()
                candidate.run();
            }
        });
    };
    /**
     * Render the view for the given model and then execute the provided effects.
     *
     * @param m Current model to render
     * @param effects Effects to run after rendering
     */
    const renderAndRunEffects = (m, effects) => {
        renderer(root, program.view(m, dispatch));
        runEffects(effects);
    };
    /**
     * Process a single payload:
     * - runs `program.update`
     * - updates the model
     * - renders and executes effects
     *
     * @param payload Message/payload to process
     */
    const step = (payload) => {
        if (model === undefined || destroyed)
            return;
        const { model: next, effects } = program.update(payload, model, dispatch);
        model = next;
        renderAndRunEffects(model, effects);
    };
    /**
     * Dispatches a payload to the program's update function.
     *
     * Dispatch is batched:
     * - multiple dispatches in a frame accumulate in `queue`
     * - the batch is processed in the next animation frame
     *
     * This reduces redundant rendering and improves performance.
     *
     * @param payload Message/payload to enqueue
     */
    const dispatch = (payload) => {
        if (destroyed)
            return;
        queue.push(payload);
        if (!queued) {
            queued = true;
            requestAnimationFrame(() => {
                if (destroyed)
                    return;
                const msgs = queue.splice(0, queue.length);
                queued = false; // reset AFTER draining
                for (const msg of msgs)
                    step(msg);
            });
        }
    };
    /**
     * Initialize the program by:
     * - running `program.init`
     * - setting the initial model
     * - rendering and running the initial effects
     */
    const start = () => {
        const { model: m0, effects } = program.init.run();
        model = m0;
        renderAndRunEffects(model, effects);
    };
    return IO(() => {
        start();
        return {
            dispatch,
            getModel: () => model,
            destroy: () => {
                destroyed = true;
                queue.length = 0;
                queued = true;
            },
        };
    });
})
    .chain((io) => io);
//# sourceMappingURL=render.js.map