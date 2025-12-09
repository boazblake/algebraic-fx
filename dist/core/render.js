/**
 * @module core/render
 *
 * Runtime loop wiring Program<M,Msg,Env> to a renderer and environment.
 *
 * Responsibilities:
 *  - run Program.init
 *  - render initial view
 *  - process dispatch(msg) → update → view → effects
 *  - execute RawEffect<Env> via Effect<Env,Msg>, IO, Reader
 */
import { IOEffectTag, ReaderEffectTag } from "./types.js";
/**
 * Execute a list of RawEffect<Env> against the current environment.
 *
 * Supported forms:
 *   - IOEffect
 *   - ReaderEffect<Env>
 *   - Effect<Env,Msg>
 *
 * CORRECTED: Added runtime validation for dispatch and env
 *
 * @param effects  list of effects to run
 * @param env      environment for Readers and Effects
 * @param dispatch dispatch function for messages emitted by Effects
 */
export const runEffects = (effects, env, dispatch) => {
    // ADDED: Runtime validation
    if (dispatch == null || typeof dispatch !== "function") {
        throw new TypeError("runEffects: dispatch must be a function");
    }
    if (!effects || effects.length === 0)
        return;
    effects.forEach((effect) => {
        if (!effect)
            return;
        try {
            // IOEffect
            if (effect._tag === IOEffectTag) {
                effect.io.run();
                return;
            }
            // ReaderEffect
            if (effect._tag === ReaderEffectTag) {
                const r = effect.reader;
                const io = r.run(env);
                io.run();
                return;
            }
            // Effect<Env,Msg>
            const fx = effect;
            if (fx.run && typeof fx.run === "function") {
                const result = fx.run(env, dispatch);
                // Handle async effects
                if (result && typeof result.catch === "function") {
                    result.catch((err) => {
                        console.error("Effect execution error:", err);
                    });
                }
            }
        }
        catch (err) {
            // ADDED: Error handling to prevent one bad effect from breaking all effects
            console.error("Effect execution error:", err);
        }
    });
};
/**
 * Construct an IOEffect from IO<void>.
 */
export const ioEffect = (io) => ({
    _tag: IOEffectTag,
    io,
});
/**
 * Construct a ReaderEffect from Reader<Env, IO<void>>.
 */
export const readerEffect = (reader) => ({
    _tag: ReaderEffectTag,
    reader,
});
/**
 * Connect Program<M,Msg,Env> to a renderer and environment.
 *
 * Flow:
 *   1. Run program.init
 *   2. Render initial view
 *   3. Run initial effects
 *   4. Return closed-over dispatch for user events
 *
 * CORRECTED: Added validation and error handling
 *
 * @param root     DOM root element
 * @param program  functional program
 * @param env      environment passed to effects
 * @param renderer renderer function
 */
export const renderApp = (root, program, env, renderer) => {
    // ADDED: Validation
    if (!root) {
        throw new TypeError("renderApp: root element is required");
    }
    if (!program) {
        throw new TypeError("renderApp: program is required");
    }
    if (!program.init || typeof program.init.run !== "function") {
        throw new TypeError("renderApp: program.init must be an IO");
    }
    if (!program.update || typeof program.update !== "function") {
        throw new TypeError("renderApp: program.update must be a function");
    }
    if (!program.view || typeof program.view !== "function") {
        throw new TypeError("renderApp: program.view must be a function");
    }
    if (!renderer || typeof renderer !== "function") {
        throw new TypeError("renderApp: renderer must be a function");
    }
    let currentModel;
    const dispatch = (msg) => {
        try {
            const { model, effects } = program.update(msg, currentModel, dispatch);
            currentModel = model;
            const vnode = program.view(currentModel, dispatch);
            renderer(root, vnode);
            runEffects(effects, env, dispatch);
        }
        catch (err) {
            console.error("Update/render cycle error:", err);
            throw err; // Re-throw so caller can handle
        }
    };
    // Initialize
    const initResult = program.init.run();
    currentModel = initResult.model;
    const vnode = program.view(currentModel, dispatch);
    renderer(root, vnode);
    runEffects(initResult.effects, env, dispatch);
};
//# sourceMappingURL=render.js.map