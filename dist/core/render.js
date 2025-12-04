import { IO } from "../adt/io.js";
import { IOEffectTag, ReaderEffectTag } from "./types.js";
import { browserEnv } from "./dom-env.js";
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
export const renderApp = (renderer, env = browserEnv()) => (rootIO, program) => rootIO
    .map((root) => {
    let model = undefined;
    const queue = [];
    let queued = false;
    let destroyed = false;
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
    const renderAndRunEffects = (m, effects) => {
        renderer(root, program.view(m, dispatch));
        runEffects(effects);
    };
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
     *  - multiple dispatches in a frame accumulate in `queue`
     *  - the batch is processed in the next animation frame
     *
     * This reduces redundant rendering and improves performance.
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
            /**
             * Stops the runtime:
             *  - prevents new dispatches from being scheduled
             *  - clears the queue
             *  - prevents further rendering or effect execution
             *
             * Safe to call multiple times.
             */
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