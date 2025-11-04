import { IO } from "../adt/io.js";
export const renderApp = (renderer) => (rootIO, program) => rootIO
    .map((root) => {
    let model;
    const queue = [];
    let queued = false;
    const runEffects = (fx) => fx?.forEach((e) => e.run());
    const run = (m, effects) => {
        renderer(root, program.view(m, dispatch));
        runEffects(effects);
    };
    const step = (msg) => {
        const { model: next, effects } = program.update(msg, model, dispatch);
        model = next;
        run(model, effects);
    };
    const dispatch = (msg) => {
        queue.push(msg);
        if (!queued) {
            queued = true;
            requestAnimationFrame(() => {
                queued = false;
                const msgs = queue.splice(0, queue.length);
                for (const msg of msgs)
                    step(msg);
            });
        }
    };
    const start = () => {
        const { model: m0, effects } = program.init.run();
        model = m0;
        run(model, effects);
    };
    return IO(() => {
        start();
        return { dispatch };
    });
})
    .chain((io) => io);
