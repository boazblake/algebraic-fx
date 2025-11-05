import { IO } from "../adt/io";
export type VChild = VNode | string | number | boolean | null | undefined;
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
export type Dispatch = (msg: any) => void;
export interface EffectLike extends IO<void> {
}
export type Program<M, Msg> = {
    init: IO<{
        model: M;
        effects: EffectLike[];
    }>;
    update: (msg: Msg, model: M, dispatch: Dispatch) => {
        model: M;
        effects: EffectLike[];
    };
    view: (model: M, dispatch: Dispatch) => any;
};
