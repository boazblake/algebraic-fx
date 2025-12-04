import { IO } from "../adt/io.js";
import { IOEffectTag, ReaderEffectTag } from "./types.js";
import { browserEnv } from "./dom-env.js";
/**
 * Render app with a given renderer and DOM environment.
 *
 * Effects:
 * - IO<void>:     effect.run()
 * - EffectLike:   effect.run()
 * - Reader<E,IO<void>>: effect.run(env).run()
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