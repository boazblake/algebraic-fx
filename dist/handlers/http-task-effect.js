import { httpTask, } from "../helpers/http-task.js";
import { taskEffect, taskCancelEffect } from "../effect/task-effect.js";
import { Reader } from "../adt/reader.js";
export const startHttpEffect = (id, req) => {
    const readerTask = Reader((env) => httpTask(req.url, {
        method: req.method ?? "GET",
        headers: req.headers,
        body: req.body ? JSON.stringify(req.body) : undefined,
    }).run(env.http));
    return taskEffect(id, readerTask, (taskId, _value) => ({
        type: "HTTP_OK",
        msg: {
            id: taskId,
            status: "ok",
        },
    }), (taskId, error) => ({
        type: "HTTP_ERR",
        msg: {
            id: taskId,
            message: error && typeof error === "object" && "message" in error
                ? error.message
                : "HTTP error",
        },
    }));
};
export const cancelHttpEffect = (id) => taskCancelEffect(id);
//# sourceMappingURL=http-task-effect.js.map