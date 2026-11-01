[**algebraic-fx v0.0.3**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderToString

# Function: renderToString()

> **renderToString**(`node`): `string`

Defined in: [core/render-to-string.ts:88](https://github.com/boazblake/algebraic-fx/blob/77da9da1ce3bde1e58fe28d609fbe1973d41180a/src/core/render-to-string.ts#L88)

Convert a mithril-lite vnode tree into an escaped HTML string.

Input: a Vnode, an array of nodes, or a primitive.
Output: an HTML string with text and attribute values escaped.

Serialization rules:
 - `tag === "#"` renders as escaped text (using `text`).
 - `attrs.key` is ignored.
 - attributes starting with `"on"` are ignored (event handlers).
 - boolean `true` attributes render as bare keys (e.g. `disabled`).
 - `style` objects are serialized into a `style="k: v; ..."` string.
 - void elements are emitted without a closing tag.

## Parameters

### node

`unknown`

A Vnode, array of nodes, string, number, boolean, null, or undefined.

## Returns

`string`

Escaped HTML string.

## Example

```ts
import { m, renderToString } from "algebraic-fx";

const greeting = renderToString(m("div", "Hello"));
const labeled = renderToString(m("div", { class: "test" }, "Hi"));
```
