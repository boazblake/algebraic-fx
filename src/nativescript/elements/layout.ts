import type { StackLayout, GridLayout, View } from "@nativescript/core";

type NSProps = Record<string, any>;
type NSChild = View | undefined | null;

/** Apply property bag to a NativeScript View */
const applyProps = (view: View, props: NSProps): void => {
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      (view as any).on(eventName, value);
    } else {
      (view as any)[key] = value;
    }
  });
};

/** Create a StackLayout node */
export const Stack = async (
  props: NSProps = {},
  children: NSChild[] = []
): Promise<StackLayout> => {
  const { StackLayout } = await import("@nativescript/core");
  const node = new StackLayout();
  applyProps(node, props);
  children.filter(Boolean).forEach((child) => node.addChild(child!));
  return node;
};

/** Create a GridLayout node */
export const Grid = async (
  props: NSProps = {},
  children: NSChild[] = []
): Promise<GridLayout> => {
  const { GridLayout } = await import("@nativescript/core");
  const node = new GridLayout();
  applyProps(node, props);
  children.filter(Boolean).forEach((child) => node.addChild(child!));
  return node;
};
