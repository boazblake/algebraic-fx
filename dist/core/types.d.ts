/**
 * Core public types for algebraic-fx.
 *
 * This module defines the fundamental contracts used by applications:
 *  - virtual DOM node shapes
 *  - message dispatch
 *  - the Program interface
 *
 * These types describe *pure data and functions* only.
 * No runtime behavior is defined here.
 */
import type { IO } from "../adt/io.js";
import type { RawEffect, Subscription } from "./effects.js";
/**
 * A virtual DOM child node.
 *
 * Children may be:
 *  - VNode objects
 *  - primitive values (string / number)
 *  - boolean, null, or undefined (ignored by the renderer)
 */
export type VChild = VNode | string | number | boolean | null | undefined;
/**
 * Element attributes and properties.
 *
 * Special lifecycle hooks are optional and renderer-specific.
 */
export type Props = Record<string, any> & {
    oncreate?: (el: Element) => void;
    onupdate?: (el: Element, oldProps: Props) => void;
    onremove?: (el: Element) => void;
};
/**
 * Virtual DOM node representation.
 *
 * This structure is produced by hyperscript helpers (e.g. `m`)
 * and consumed by renderers.
 *
 * Fields:
 *  - tag: element tag name (or "#" for text nodes)
 *  - props: attributes and properties
 *  - children: child nodes
 *  - key: optional stable identity for keyed diffing
 *  - dom: renderer-managed reference to the real DOM node
 */
export type VNode = {
    tag: string;
    props?: Props | null;
    children: VChild[] | null;
    key?: string | number;
    dom?: Node | null;
};
/**
 * Dispatch function used to send messages into the runtime.
 *
 * Calling dispatch schedules a state transition via Program.update.
 */
export type Dispatch<Msg> = (msg: Msg) => void;
/**
 * Optional helper shape for tagged messages.
 *
 * This type is not required by the runtime, but can be used
 * by applications that prefer structured message envelopes.
 */
export type Payload<T extends string, M extends object = {}> = {
    type: T;
    msg: M;
};
/**
 * Program<M, Msg, Env>
 *
 * A pure description of an application.
 *
 * A Program is **not** executed directly. It is a declarative specification
 * that is interpreted by the algebraic-fx runtime (`renderApp`).
 *
 * A Program consists of four parts:
 *
 * ---------------------------------------------------------------------------
 * init
 * ---------------------------------------------------------------------------
 *
 * An `IO` action that produces:
 *  - the initial application model
 *  - an initial list of one-shot effects
 *
 * `init` is executed exactly once by the runtime at application startup.
 *
 * It must be pure and deterministic.
 *
 * ---------------------------------------------------------------------------
 * update
 * ---------------------------------------------------------------------------
 *
 * A pure state transition function:
 *
 *   (msg, model, dispatch) -> { model, effects }
 *
 * Given:
 *  - a message (`Msg`)
 *  - the current model (`M`)
 *  - a dispatch function (for advanced coordination cases)
 *
 * it returns:
 *  - a new model
 *  - a list of **one-shot effects** (`RawEffect`)
 *
 * Important:
 *  - `update` MUST NOT perform side effects directly
 *  - it only *describes* effects as data
 *  - returned effects are interpreted by the runtime
 *
 * ---------------------------------------------------------------------------
 * view
 * ---------------------------------------------------------------------------
 *
 * A pure rendering function:
 *
 *   (model, dispatch) -> VNode
 *
 * It transforms the current model into a virtual DOM tree.
 *
 * The runtime is responsible for reconciling this tree into the real DOM.
 *
 * ---------------------------------------------------------------------------
 * subs (optional)
 * ---------------------------------------------------------------------------
 *
 * A pure function that describes **long-lived subscriptions**:
 *
 *   (model) -> Subscription[]
 *
 * Subscriptions are:
 *  - persistent over time
 *  - keyed by identity
 *  - started and stopped automatically by the runtime
 *
 * This mirrors Elm’s `subscriptions`:
 *
 *  - When a subscription appears, the runtime starts it
 *  - When it disappears, the runtime cleans it up
 *  - Re-rendering does NOT restart subscriptions
 *
 * `subs` must:
 *  - depend only on the model
 *  - return the same keys for logically identical subscriptions
 *
 * ---------------------------------------------------------------------------
 * Semantics Summary
 * ---------------------------------------------------------------------------
 *
 *  - `init`  → initial Cmd-like effects
 *  - `update` → one-shot Cmd-like effects
 *  - `subs`  → long-lived Sub-like effects
 *  - `view`  → pure rendering
 *
 * Programs never run effects themselves.
 * The runtime owns:
 *  - effect execution
 *  - subscription lifetimes
 *  - cleanup
 *
 * This separation guarantees:
 *  - determinism
 *  - testability
 *  - correct subscription behavior
 */
export type Program<M, Msg, Env> = {
    init: IO<{
        model: M;
        effects: RawEffect<Env, Msg>[];
    }>;
    update: (msg: Msg, model: M, dispatch: Dispatch<Msg>) => {
        model: M;
        effects: RawEffect<Env, Msg>[];
    };
    view: (model: M, dispatch: Dispatch<Msg>) => VChild | VChild[];
    /**
     * Describe long-lived subscriptions derived from the current model.
     *
     * This function is optional.
     * If omitted, the program has no subscriptions.
     */
    subs?: (model: M) => Subscription<Env, Msg>[];
};
//# sourceMappingURL=types.d.ts.map