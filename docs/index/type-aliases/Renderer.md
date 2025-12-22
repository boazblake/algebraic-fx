[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Renderer

# Type Alias: Renderer()

> **Renderer** = (`root`, `vnode`) => `void`

Defined in: [core/render.ts:23](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/render.ts#L23)

Renderer function.

A renderer reconciles a virtual DOM tree into a concrete DOM subtree.

algebraic-fx does not prescribe a renderer implementation.
The default renderer is `render` from `core/mithril-lite.ts`.

## Parameters

### root

`Element`

### vnode

`any`

## Returns

`void`
