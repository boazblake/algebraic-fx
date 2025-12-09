[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / ap

# Function: ap()

> **ap**\<`A`, `B`\>(`fb`): (`fa`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

Defined in: [adt/io.ts:86](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/io.ts#L86)

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
