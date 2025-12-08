import type { EffectLike, Payload } from "../core/types.js";
import type { SubscriptionDescriptor } from "../runtime/subscription-controller.js";
export declare const startSubscriptionEffect: <Env extends {
    subscriptions: any;
}, P extends Payload>(sub: SubscriptionDescriptor) => EffectLike<Env, P>;
export declare const stopSubscriptionEffect: <Env extends {
    subscriptions: any;
}, P extends Payload>(kind: string, id: string) => EffectLike<Env, P>;
//# sourceMappingURL=stream-effect.d.ts.map