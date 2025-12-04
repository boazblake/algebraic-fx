[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Renderer

# Type Alias: Renderer()

> **Renderer** = (`root`, `vnode`) => `void`

Defined in: [src/core/render.ts:20](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/core/render.ts#L20)

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
