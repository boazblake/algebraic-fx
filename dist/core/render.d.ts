import { IO } from "../adt/io.js";
import type { Program } from "./types.js";
import type { DomEnv } from "./dom-env.js";
export type Renderer = (root: Element, vnode: any) => void;
/**
 * Render app with a given renderer and DOM environment.
 *
 * Effects:
 * - IO<void>:     effect.run()
 * - EffectLike:   effect.run()
 * - Reader<E,IO<void>>: effect.run(env).run()
 */
export declare const renderApp: (renderer: Renderer, env?: DomEnv) => <M, P>(rootIO: IO<Element>, program: Program<M, P, DomEnv>) => IO<{
    dispatch: (payload: P) => void;
    getModel: () => M | undefined;
    destroy: () => void;
}>;
//# sourceMappingURL=render.d.ts.map