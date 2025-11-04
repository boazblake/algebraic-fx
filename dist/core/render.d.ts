import type { Program } from "./types";
export type Renderer = (root: Element, vnode: any) => void;
export declare const renderApp: (renderer: Renderer) => <M, Msg>(root: Element, program: Program<M, Msg>) => {
    dispatch: (msg: Msg) => void;
};
