export type SubscriptionId = string;
export type SubscriptionDescriptor = {
    id: SubscriptionId;
    kind: "ws" | "sse" | "timer";
    payload: unknown;
};
export type SubscriptionContext = {
    active: Set<SubscriptionId>;
    dispatch: (payload: unknown) => void;
};
export type SubscriptionHandler = {
    start: (id: SubscriptionId, payload: unknown, ctx: SubscriptionContext) => void;
    stop: (id: SubscriptionId, ctx: SubscriptionContext) => void;
};
export type SubscriptionController<P> = {
    start: (sub: SubscriptionDescriptor) => void;
    stop: (kind: string, id: SubscriptionId) => void;
};
export declare const createSubscriptionController: <P>(dispatch: (payload: P) => void, handlers: Record<string, SubscriptionHandler>) => SubscriptionController<P>;
//# sourceMappingURL=subscription-controller.d.ts.map