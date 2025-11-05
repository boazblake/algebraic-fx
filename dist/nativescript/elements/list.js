import { ObservableArray as NSObservableArray } from "@nativescript/core";
const applyProps = (view, props) => {
    Object.entries(props || {}).forEach(([key, val]) => {
        if (key.startsWith("on") && typeof val === "function") {
            const evt = key.slice(2).toLowerCase();
            view.on(evt, val);
        }
        else {
            view[key] = val;
        }
    });
};
/**
 * Create a reactive NativeScript ListView with observable items.
 * Auto-updates when items change.
 */
export const NSList = async (props) => {
    const { ListView } = await import("@nativescript/core");
    const view = new ListView();
    const data = new NSObservableArray(props.items);
    view.items = data;
    applyProps(view, props);
    view.on(ListView.itemLoadingEvent, async (args) => {
        const idx = args.index;
        const item = data.getItem(idx);
        const rendered = await props.render(item, idx);
        args.view = rendered;
    });
    // Return the view + mutators to modify the underlying array
    view.data = data;
    view.pushItem = (item) => data.push(item);
    view.removeItem = (index) => data.splice(index, 1);
    view.replaceAll = (items) => {
        data.splice(0, data.length, ...items);
    };
    return view;
};
