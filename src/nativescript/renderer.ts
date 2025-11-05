import type { LayoutBase, View } from "@nativescript/core";

/**
 * Renderer function for NativeScript views.
 * Lazily loads NativeScript core and applies naive re-render.
 */
export const nsRenderer = async (
  root: LayoutBase | null | undefined,
  vnode: View | null | undefined
): Promise<void> => {
  if (!root || !vnode) return;

  try {
    const core = await import("@nativescript/core");
    if (!core) {
      console.warn("[effects-vdom] NativeScript core not found.");
      return;
    }

    if (!(root as any).__mounted) {
      (root as any).__mounted = true;
      root.removeChildren?.();
      root.addChild?.(vnode);
      return;
    }

    // Naive diff: replace subtree
    root.eachChildView?.((child) => {
      root.removeChild(child);
      return true;
    });
    root.addChild?.(vnode);
  } catch (err) {
    console.error("[effects-vdom] nsRenderer failed:", err);
  }
};
