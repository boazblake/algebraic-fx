[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Renderer

# Type Alias: Renderer()

> **Renderer** = (`root`, `vnode`) => `void`

Defined in: [src/core/render.ts:28](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/render.ts#L28)

Renderer function type.

The renderer is responsible for:
- receiving a root DOM node
- receiving a vnode
- updating the DOM

mithril-lite provides a compatible renderer.

## Parameters

### root

`Element`

### vnode

`any`

## Returns

`void`
