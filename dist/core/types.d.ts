import type { IO } from "../adt/io.js";
import type { Reader } from "../adt/reader.js";
import type { DomEnv } from "./dom-env.js";
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
export type VNode = {
    tag: string;
    props?: Props | null;
    children: VChild[];
    key?: string | number;
};
export type Dispatch<P> = (payload: P) => void;
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
export type RawEffect<E> = IO<void> | Reader<E, IO<void>> | EffectLike | IOEffect | ReaderEffect<E>;
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