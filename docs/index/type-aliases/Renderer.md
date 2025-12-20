[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Renderer

# Type Alias: Renderer()

> **Renderer** = (`root`, `vnode`) => `void`

Defined in: [core/render.ts:31](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/core/render.ts#L31)

Renderer function.

A renderer reconciles a virtual DOM tree into a concrete DOM subtree.

algebraic-fx does not prescribe a renderer implementation.
The default renderer is mithril-lite (`render` from core/mithril-lite.ts).

## Parameters

### root

`Element`

### vnode

`any`

## Returns

`void`
