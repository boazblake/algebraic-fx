[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / ap

# Function: ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

Defined in: [src/adt/io.ts:86](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L86)

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
