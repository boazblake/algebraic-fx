export type VnodeAttrs = Record<string, any> | null;
export type VnodeChild = Vnode<any> | null;
export type VnodeChildren = VnodeChild[];
export type Vnode<T = any> = {
    tag: string;
    key: any;
    attrs: VnodeAttrs;
    children: VnodeChildren;
    text: string | null;
    dom: T | null;
};
export declare function Vnode(tag: string, key: any, attrs: VnodeAttrs, children: VnodeChildren, text: string | null, dom: any | null): Vnode;
export declare namespace Vnode {
    var normalize: (node: any) => VnodeChild;
    var normalizeChildren: (input: any[]) => AnyVnode[];
}
type AnyVnode = Vnode<any>;
export declare function m(selector: string, ...rest: any[]): AnyVnode;
export declare function render(dom: HTMLElement, vnodes: any | any[]): void;
export {};
//# sourceMappingURL=mithril-lite.d.ts.map