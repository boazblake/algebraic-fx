import type { Label, Button, TextField, View } from "@nativescript/core";

type NSProps = Record<string, any>;

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

export const NSLabel = async (props: NSProps = {}): Promise<Label> => {
  const { Label } = await import("@nativescript/core");
  const node = new Label();
  applyProps(node, props);
  return node;
};

export const NSButton = async (props: NSProps = {}): Promise<Button> => {
  const { Button } = await import("@nativescript/core");
  const node = new Button();
  applyProps(node, props);
  return node;
};

export const NSTextField = async (props: NSProps = {}): Promise<TextField> => {
  const { TextField } = await import("@nativescript/core");
  const node = new TextField();
  applyProps(node, props);
  return node;
};
