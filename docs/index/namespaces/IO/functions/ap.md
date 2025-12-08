[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / ap

# Function: ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

Defined in: [adt/io.ts:86](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/io.ts#L86)

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
