export const createSubscriptionController = (dispatch, handlers) => {
    const active = new Set();
    const ctx = {
        active,
        dispatch: dispatch,
    };
    return {
        start(sub) {
            if (active.has(sub.id))
                return;
            active.add(sub.id);
            handlers[sub.kind].start(sub.id, sub.payload, ctx);
        },
        stop(kind, id) {
            if (!active.has(id))
                return;
            active.delete(id);
            handlers[kind].stop(id, ctx);
        },
    };
};
//# sourceMappingURL=subscription-controller.js.map