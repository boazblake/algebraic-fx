// src/core/render.ts
import { runEffects } from "./effects.js";
/**
 * Connect Program<M, Msg, Env> to a renderer and environment.
 */
export const renderApp = (root, program, env, renderer) => {
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
        const { model, effects } = program.update(msg, currentModel, dispatch);
        currentModel = model;
        const vnode = program.view(currentModel, dispatch);
        renderer(root, vnode);
        runEffects(env, dispatch, effects);
    };
    // init
    const initResult = program.init.run();
    currentModel = initResult.model;
    const vnode = program.view(currentModel, dispatch);
    renderer(root, vnode);
    runEffects(env, dispatch, initResult.effects);
};
//# sourceMappingURL=render.js.map