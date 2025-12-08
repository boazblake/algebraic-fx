import type { Task } from "../adt/task.js";
export type TaskId = string;
export type TaskDescriptor<E, A, P, Env> = {
    id: TaskId;
    task: Task<E, A>;
    toSuccessPayload: (id: TaskId, value: A) => P;
    toErrorPayload: (id: TaskId, error: E | unknown) => P;
};
export type TaskController<P, Env> = {
    registry: Map<TaskId, AbortController>;
    runTask: <E, A>(desc: TaskDescriptor<E, A, P, Env>, env: Env, dispatch: (payload: P) => void) => void;
    cancelTask: (id: TaskId) => void;
};
export declare const createTaskController: <P, Env>() => TaskController<P, Env>;
//# sourceMappingURL=task-controller.d.ts.map