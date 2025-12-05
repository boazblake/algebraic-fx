[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / VNode

# Type Alias: VNode

> **VNode** = `object`

Defined in: [src/core/types.ts:49](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/types.ts#L49)

Virtual DOM node produced by hyperscript (`m`) and consumed by the renderer.

## Properties

### children

> **children**: [`VChild`](VChild.md)[]

Defined in: [src/core/types.ts:52](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/types.ts#L52)

Array of vnode children

***

### key?

> `optional` **key**: `string` \| `number`

Defined in: [src/core/types.ts:53](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/types.ts#L53)

Stable identity used for keyed diffing

***

### props?

> `optional` **props**: [`Props`](Props.md) \| `null`

Defined in: [src/core/types.ts:51](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/types.ts#L51)

Attributes and properties applied to DOM elements

***

### tag

> **tag**: `string`

Defined in: [src/core/types.ts:50](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/types.ts#L50)

HTML/SVG tag name (or "#" for text node)
