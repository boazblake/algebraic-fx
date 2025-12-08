import type { HttpEnv } from "../helpers/http-task.js";
import type { TaskController } from "../runtime/task-controller.js";
import type { SubscriptionController } from "../runtime/subscription-controller.js";
import type { Payload } from "../core/types.js";
export type WsEnv = {
    url: string;
};
export type AppEnv<P extends Payload> = {
    http: HttpEnv;
    ws: WsEnv;
    taskController: TaskController<P, AppEnv<P>>;
    subscriptions: SubscriptionController<P>;
};
//# sourceMappingURL=env.d.ts.map