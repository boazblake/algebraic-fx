import type { EffectLike, Payload } from "../core/types.js";
import { type HttpEnv } from "../helpers/http-task.js";
import type { TaskId } from "../runtime/task-controller.js";
export type HttpOkPayload = Payload<"HTTP_OK", {
    id: string;
    status: string;
}>;
export type HttpErrPayload = Payload<"HTTP_ERR", {
    id: string;
    message: string;
}>;
export type HttpRuntimePayload = HttpOkPayload | HttpErrPayload;
export type HttpRequest = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
};
export declare const startHttpEffect: <Env extends {
    http: HttpEnv;
    taskController: any;
}>(id: TaskId, req: HttpRequest) => EffectLike<Env, HttpRuntimePayload>;
export declare const cancelHttpEffect: <Env extends {
    taskController: any;
}>(id: TaskId) => EffectLike<Env, HttpRuntimePayload>;
//# sourceMappingURL=http-task-effect.d.ts.map