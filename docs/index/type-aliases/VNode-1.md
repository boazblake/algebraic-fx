[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / VNode

# Type Alias: VNode

> **VNode** = `object`

Defined in: [core/types.ts:67](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L67)

The virtual DOM node shape recognized by the algebraic-fx renderer.

- `tag`: HTML tag name or "#" for text nodes
- `children`: optional list of child nodes
- `props`: optional attributes, event handlers, lifecycle hooks
- `key`: optional identity for keyed diffing
- `dom`: real DOM element reference (populated by renderer)

## Properties

### children

> **children**: [`VChild`](VChild.md)[] \| `null`

Defined in: [core/types.ts:70](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L70)

***

### dom?

> `optional` **dom**: `Node` \| `null`

Defined in: [core/types.ts:72](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L72)

***

### key?

> `optional` **key**: `string` \| `number`

Defined in: [core/types.ts:71](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L71)

***

### props?

> `optional` **props**: [`Props`](Props.md) \| `null`

Defined in: [core/types.ts:69](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L69)

***

### tag

> **tag**: `string`

Defined in: [core/types.ts:68](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L68)
