[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / ap

# Function: ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

Defined in: [src/adt/io.ts:86](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/io.ts#L86)

Point-free applicative apply.

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### fb

[`IO`](../../../type-aliases/IO.md)\<(`a`) => `B`\>

## Returns

> (`fa`): [`IO`](../../../type-aliases/IO.md)\<`B`\>

### Parameters

#### fa

[`IO`](../../../type-aliases/IO.md)\<`A`\>

### Returns

[`IO`](../../../type-aliases/IO.md)\<`B`\>
