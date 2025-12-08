import type { EffectLike, Payload } from "../core/types.js";
import type { Reader } from "../adt/reader.js";
import type { Task } from "../adt/task.js";
import type { TaskId, TaskController } from "../runtime/task-controller.js";
export declare const taskEffect: <Env extends {
    taskController: TaskController<P, Env>;
}, P extends Payload, E, A>(id: TaskId, readerTask: Reader<Env, Task<E, A>>, toSuccessPayload: (id: TaskId, value: A) => P, toErrorPayload: (id: TaskId, error: E | unknown) => P) => EffectLike<Env, P>;
export declare const taskCancelEffect: <Env extends {
    taskController: TaskController<P, Env>;
}, P extends Payload>(id: TaskId) => EffectLike<Env, P>;
//# sourceMappingURL=task-effect.d.ts.map