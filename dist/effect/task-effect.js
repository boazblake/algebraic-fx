export const taskEffect = (id, readerTask, toSuccessPayload, toErrorPayload) => ({
    run(env, dispatch) {
        const task = readerTask.run(env);
        env.taskController.runTask({
            id,
            task,
            toSuccessPayload,
            toErrorPayload,
        }, env, dispatch);
    },
});
export const taskCancelEffect = (id) => ({
    run(env) {
        env.taskController.cancelTask(id);
    },
});
//# sourceMappingURL=task-effect.js.map