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
export const NSLabel = async (props = {}) => {
    const { Label } = await import("@nativescript/core");
    const node = new Label();
    applyProps(node, props);
    return node;
};
export const NSButton = async (props = {}) => {
    const { Button } = await import("@nativescript/core");
    const node = new Button();
    applyProps(node, props);
    return node;
};
export const NSTextField = async (props = {}) => {
    const { TextField } = await import("@nativescript/core");
    const node = new TextField();
    applyProps(node, props);
    return node;
};
