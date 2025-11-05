/** Apply property bag to a NativeScript View */
const applyProps = (view, props) => {
    Object.entries(props).forEach(([key, value]) => {
        if (key.startsWith("on") && typeof value === "function") {
            const eventName = key.slice(2).toLowerCase();
            view.on(eventName, value);
        }
        else {
            view[key] = value;
        }
    });
};
/** Create a StackLayout node */
export const Stack = async (props = {}, children = []) => {
    const { StackLayout } = await import("@nativescript/core");
    const node = new StackLayout();
    applyProps(node, props);
    children.filter(Boolean).forEach((child) => node.addChild(child));
    return node;
};
/** Create a GridLayout node */
export const Grid = async (props = {}, children = []) => {
    const { GridLayout } = await import("@nativescript/core");
    const node = new GridLayout();
    applyProps(node, props);
    children.filter(Boolean).forEach((child) => node.addChild(child));
    return node;
};
