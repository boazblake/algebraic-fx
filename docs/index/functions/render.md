[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / render

# Function: render()

> **render**(`dom`, `vnodes`): `void`

Defined in: [core/mithril-lite.ts:701](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/mithril-lite.ts#L701)

Patch DOM tree under `root` using mithril-lite's virtual DOM diffing.

- Supports keyed diffing (O(n log n)) with LIS algorithm
- Supports SVG namespace transitions
- Only minimal DOM updates performed

## Parameters

### dom

`HTMLElement`

### vnodes

`any`

VNode or array of VNodes

## Returns

`void`
