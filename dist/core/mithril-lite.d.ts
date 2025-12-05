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
    var normalizeChildren: (input: any[]) => Vnode[];
}
/**
 * Hyperscript function for building VNodes.
 *
 * Syntax:
 *  - m("div", "text")
 *  - m("div#id.class1.class2", {...attrs}, children...)
 *  - m("svg", {...attrs}, [...children])
 *
 * Selector grammar:
 *  - tag (div)
 *  - #id (#main)
 *  - .class (.container)
 *  - combined (div#header.title.highlight)
 *
 * Keys:
 *  - pass { key: string } inside attrs to enable keyed diffing
 *
 * @returns VNode
 */
export declare function m(selector: string, ...rest: any[]): Vnode;
/**
 * Patch DOM tree under `root` using mithril-lite's virtual DOM diffing.
 *
 * - Supports keyed diffing (O(n log n)) with LIS algorithm
 * - Supports SVG namespace transitions
 * - Only minimal DOM updates performed
 *
 * @param root Root DOM element
 * @param vnodes VNode or array of VNodes
 */ export declare function render(dom: HTMLElement, vnodes: any | any[]): void;
//# sourceMappingURL=mithril-lite.d.ts.map