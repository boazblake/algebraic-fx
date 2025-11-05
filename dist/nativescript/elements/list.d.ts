import type { ListView, View } from "@nativescript/core";
type NSProps = Record<string, any>;
type RenderItem<T> = (item: T, index: number) => Promise<View> | View;
/**
 * Create a reactive NativeScript ListView with observable items.
 * Auto-updates when items change.
 */
export declare const NSList: <T>(props: NSProps & {
    items: T[];
    render: RenderItem<T>;
}) => Promise<ListView>;
export {};
