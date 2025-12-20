[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / VNode

# Type Alias: VNode

> **VNode** = `object`

Defined in: [core/types.ts:56](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/core/types.ts#L56)

Virtual DOM node representation.

This structure is produced by hyperscript helpers (e.g. `m`)
and consumed by renderers.

Fields:
 - tag: element tag name (or "#" for text nodes)
 - props: attributes and properties
 - children: child nodes
 - key: optional stable identity for keyed diffing
 - dom: renderer-managed reference to the real DOM node

## Properties

### children

> **children**: [`VChild`](VChild.md)[] \| `null`

Defined in: [core/types.ts:59](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/core/types.ts#L59)

***

### dom?

> `optional` **dom**: `Node` \| `null`

Defined in: [core/types.ts:61](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/core/types.ts#L61)

***

### key?

> `optional` **key**: `string` \| `number`

Defined in: [core/types.ts:60](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/core/types.ts#L60)

***

### props?

> `optional` **props**: [`Props`](Props.md) \| `null`

Defined in: [core/types.ts:58](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/core/types.ts#L58)

***

### tag

> **tag**: `string`

Defined in: [core/types.ts:57](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/core/types.ts#L57)
