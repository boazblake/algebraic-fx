[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Renderer

# Type Alias: Renderer()

> **Renderer** = (`root`, `vnode`) => `void`

Defined in: [src/core/render.ts:20](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/render.ts#L20)

A DOM renderer function.

The renderer is responsible for:
- receiving a root DOM element
- receiving a virtual node (vnode)
- updating the DOM to reflect the vnode

Compatible with `mithril-lite` and similar virtual DOM renderers.

## Parameters

### root

`Element`

Root DOM element to render into

### vnode

`any`

Virtual node tree to render

## Returns

`void`
