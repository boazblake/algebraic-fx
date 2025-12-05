import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { DomEnv } from "./dom-env.js";
/**
 * Core type definitions for algebraic-fx programs, effects, and virtual DOM.
 *
 * This module defines:
 * - VNodes for the mithril-lite renderer
 * - Dispatch and Payload types
 * - RawEffect (IO, Reader, EffectLike)
 * - Program<M,P,E> interface
 *
 * These types are consumed by `renderApp` and userland programs.
 */
/**
 * Union of all possible vnode children types.
 *
 * A child may be:
 * - another VNode
 * - primitive text (string/number)
 * - boolean/null/undefined (ignored)
 */
export type VChild = VNode | string | number | boolean | null | undefined;
export type Msg = Record<string, string>;
export type Payload<T extends string = string, M extends Msg = Msg> = {
    type: T;
    msg: M;
};
export type Props = Record<string, any> & {
    oncreate?: (el: Element) => void;
    onupdate?: (el: Element, oldProps: Props) => void;
    onremove?: (el: Element) => void;
};
/**
 * Virtual DOM node produced by hyperscript (`m`) and consumed by the renderer.
 *
 * @property tag  HTML/SVG tag name (or "#" for text node)
 * @property props Attributes and properties applied to DOM elements
 * @property children Array of vnode children
 * @property key Stable identity used for keyed diffing
 * @property dom Reference to the actual DOM node after rendering
 */
export type VNode = {
    tag: string;
    props?: Props | null;
    children: VChild[] | null;
    key?: string | number;
};
/**
 * Dispatch function for sending messages to the program's update function.
 *
 * @template P Payload message type
 */
export type Dispatch<P> = (payload: P) => void;
/**
 * Normalized effect representation.
 *
 * Any RawEffect is normalized to one of:
 * - IO<void>
 * - Reader<E, IO<void>>
 * - EffectLike (object containing a .run(): void)
 *
 * renderApp executes these effects after rendering each frame.
 */
export interface EffectLike {
    run: () => void;
}
export declare const IOEffectTag: unique symbol;
export declare const ReaderEffectTag: unique symbol;
export type IOEffect = {
    _tag: typeof IOEffectTag;
    io: IO<void>;
};
export type ReaderEffect<E> = {
    _tag: typeof ReaderEffectTag;
    reader: Reader<E, IO<void>>;
};
export declare const ioEffect: (io: IO<void>) => IOEffect;
export declare const readerEffect: <E>(reader: Reader<E, IO<void>>) => ReaderEffect<E>;
/**
 * Effect description accepted by the runtime.
 *
 * A raw effect may be:
 * - IO<void>
 * - Reader<E, IO<void>>
 * - EffectLike (already normalized)
 * - Tagged IOEffect / ReaderEffect<E>
 *
 * It is normalized inside `renderApp` into an executable effect.
 */
export type RawEffect<E> = IO<void> | Reader<E, IO<void>> | EffectLike | IOEffect | ReaderEffect<E>;
/**
 * A pure functional application description.
 *
 * A Program consists of:
 * - init: IO returning initial model + initial effects
 * - update: pure function (payload, model) => new model + effects
 * - view: pure function (model, dispatch) => virtual DOM tree
 *
 * renderApp wires the Program to a renderer and executes the effects.
 *
 * @template M Model type
 * @template P Payload type
 * @template E Environment used for Reader<E,IO<void>>
 */
export type Program<M, P, E = DomEnv> = {
    init: IO<{
        model: M;
        effects: RawEffect<E>[];
    }>;
    update: (payload: P, model: M, dispatch: Dispatch<P>) => {
        model: M;
        effects: RawEffect<E>[];
    };
    view: (model: M, dispatch: Dispatch<P>) => VChild | VChild[];
};
//# sourceMappingURL=types.d.ts.map