// src/core/render.ts
import { runEffects } from "./effects.js";
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