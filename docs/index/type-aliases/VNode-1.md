[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / VNode

# Type Alias: VNode

> **VNode** = `object`

Defined in: [core/types.ts:50](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L50)

Virtual DOM node.

## Properties

### children

> **children**: [`VChild`](VChild.md)[] \| `null`

Defined in: [core/types.ts:53](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L53)

child vnodes

***

### dom?

> `optional` **dom**: `Node` \| `null`

Defined in: [core/types.ts:55](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L55)

real DOM node reference (set by renderer)

***

### key?

> `optional` **key**: `string` \| `number`

Defined in: [core/types.ts:54](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L54)

stable identity for keyed diffing

***

### props?

> `optional` **props**: [`Props`](Props.md) \| `null`

Defined in: [core/types.ts:52](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L52)

attributes / props

***

### tag

> **tag**: `string`

Defined in: [core/types.ts:51](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L51)

tag name or "#" for text node
