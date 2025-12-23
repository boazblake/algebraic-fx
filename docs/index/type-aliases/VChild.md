[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / VChild

# Type Alias: VChild

> **VChild** = [`VNode`](VNode-1.md) \| `string` \| `number` \| `boolean` \| `null` \| `undefined`

Defined in: [core/types.ts:30](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L30)

A virtual DOM child node.

Children may be:
 - VNode objects
 - primitive values (string / number)
 - boolean, null, or undefined (ignored by the renderer)
