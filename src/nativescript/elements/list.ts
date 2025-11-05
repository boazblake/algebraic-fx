import type { ListView, View } from "@nativescript/core";
import { ObservableArray as NSObservableArray } from "@nativescript/core";

type NSProps = Record<string, any>;
type RenderItem<T> = (item: T, index: number) => Promise<View> | View;

const applyProps = (view: View, props: NSProps): void => {
  Object.entries(props || {}).forEach(([key, val]) => {
    if (key.startsWith("on") && typeof val === "function") {
      const evt = key.slice(2).toLowerCase();
      (view as any).on(evt, val);
    } else {
      (view as any)[key] = val;
    }
  });
};

/**
 * Create a reactive NativeScript ListView with observable items.
 * Auto-updates when items change.
 */
export const NSList = async <T>(
  props: NSProps & {
    items: T[];
    render: RenderItem<T>;
  }
): Promise<ListView> => {
  const { ListView } = await import("@nativescript/core");
  const view = new ListView();

  const data = new NSObservableArray<T>(props.items);
  (view as any).items = data;

  applyProps(view, props);

  view.on(ListView.itemLoadingEvent, async (args: any) => {
    const idx = args.index;
    const item = data.getItem(idx);
    const rendered = await props.render(item, idx);
    args.view = rendered;
  });

  // Return the view + mutators to modify the underlying array
  (view as any).data = data;
  (view as any).pushItem = (item: T) => data.push(item);
  (view as any).removeItem = (index: number) => data.splice(index, 1);
  (view as any).replaceAll = (items: T[]) => {
    data.splice(0, data.length, ...items);
  };

  return view;
};
