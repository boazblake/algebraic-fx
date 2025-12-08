export const startSubscriptionEffect = (sub) => ({
    run(env) {
        env.subscriptions.start(sub);
    },
});
export const stopSubscriptionEffect = (kind, id) => ({
    run(env) {
        env.subscriptions.stop(kind, id);
    },
});
//# sourceMappingURL=stream-effect.js.map