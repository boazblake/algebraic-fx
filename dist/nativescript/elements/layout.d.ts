import type { StackLayout, GridLayout, View } from "@nativescript/core";
type NSProps = Record<string, any>;
type NSChild = View | undefined | null;
/** Create a StackLayout node */
export declare const Stack: (props?: NSProps, children?: NSChild[]) => Promise<StackLayout>;
/** Create a GridLayout node */
export declare const Grid: (props?: NSProps, children?: NSChild[]) => Promise<GridLayout>;
export {};
