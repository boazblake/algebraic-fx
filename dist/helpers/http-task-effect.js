import { httpTask } from "./http-task";
import { taskEffect, taskCancelEffect } from "../effect/task-effect";
export const startHttpEffect = (id, req) => taskEffect(id, httpTask((env) => ({
    url: env.http.baseUrl + req.url,
    method: req.method ?? "GET",
    headers: req.headers,
    body: req.body,
})), (id, response) => ({ type: "HTTP_OK", id, response }), (id, error) => ({ type: "HTTP_ERR", id, error }));
export const cancelHttpEffect = (id) => taskCancelEffect(id);
//# sourceMappingURL=http-task-effect.js.map