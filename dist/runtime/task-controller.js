const isRight = (either) => either._tag === "Right";
export const createTaskController = () => {
    const registry = new Map();
    const runTask = (desc, env, dispatch) => {
        const existing = registry.get(desc.id);
        if (existing)
            existing.abort();
        const controller = new AbortController();
        registry.set(desc.id, controller);
        desc.task
            .run(controller.signal)
            .then((either) => {
            if (isRight(either)) {
                const value = either.value;
                dispatch(desc.toSuccessPayload(desc.id, value));
            }
            else {
                const err = either.value;
                dispatch(desc.toErrorPayload(desc.id, err));
            }
        })
            .catch((error) => {
            if (error?.name === "AbortError")
                return;
            dispatch(desc.toErrorPayload(desc.id, error));
        })
            .finally(() => {
            registry.delete(desc.id);
        });
    };
    const cancelTask = (id) => {
        const c = registry.get(id);
        if (c) {
            c.abort();
            registry.delete(id);
        }
    };
    return {
        registry,
        runTask,
        cancelTask,
    };
};
//# sourceMappingURL=task-controller.js.map