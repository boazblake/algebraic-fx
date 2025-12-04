[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / render

# Function: render()

> **render**(`dom`, `vnodes`): `void`

Defined in: [src/core/mithril-lite.ts:635](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/mithril-lite.ts#L635)

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
