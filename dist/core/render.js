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
 * @param effects  list of effects to run
 * @param env      environment for Readers and Effects
 * @param dispatch dispatch function for messages emitted by Effects
 */
export const runEffects = (effects, env, dispatch) => {
    effects?.forEach((effect) => {
        if (!effect)
            return;
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
        fx.run(env, dispatch);
    });
};
/**
 * Connect Program<M,Msg,Env> to a renderer and environment.
 *
 * Flow:
 *   1. Run program.init
 *   2. Render initial view
 *   3. Run initial effects
 *   4. Return closed-over dispatch for user events
 *
 * @param root     DOM root element
 * @param program  functional program
 * @param env      environment passed to effects
 * @param renderer renderer function
 */
export const renderApp = (root, program, env, renderer) => {
    let currentModel;
    const dispatch = (msg) => {
        const { model, effects } = program.update(msg, currentModel, dispatch);
        currentModel = model;
        const vnode = program.view(currentModel, dispatch);
        renderer(root, vnode);
        runEffects(effects, env, dispatch);
    };
    const initResult = program.init.run();
    currentModel = initResult.model;
    const vnode = program.view(currentModel, dispatch);
    renderer(root, vnode);
    runEffects(initResult.effects, env, dispatch);
};
//# sourceMappingURL=render.js.map