import type { EffectLike } from "../core/types.ts";
import type { TaskId } from "../runtime/task-controller";
export type HttpOkMsg = {
    type: "HTTP_OK";
    id: TaskId;
    response: any;
};
export type HttpErrMsg = {
    type: "HTTP_ERR";
    id: TaskId;
    error: any;
};
export type HttpMsg = HttpOkMsg | HttpErrMsg;
export type HttpRequest = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
};
export declare const startHttpEffect: <Env extends {
    http: any;
    taskController: any;
}>(id: TaskId, req: HttpRequest) => EffectLike<Env>;
export declare const cancelHttpEffect: <Env extends {
    taskController: any;
}>(id: TaskId) => any;
//# sourceMappingURL=http-task-effect.d.ts.map