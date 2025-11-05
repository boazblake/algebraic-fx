import type { LayoutBase, View } from "@nativescript/core";
/**
 * Renderer function for NativeScript views.
 * Lazily loads NativeScript core and applies naive re-render.
 */
export declare const nsRenderer: (root: LayoutBase | null | undefined, vnode: View | null | undefined) => Promise<void>;
