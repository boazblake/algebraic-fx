[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / ap

# Function: ap()

> **ap**\<`E`, `A`, `B`\>(`fb`): (`fa`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

Defined in: [src/adt/reader.ts:96](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/reader.ts#L96)

Point-free applicative apply.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### fb

[`Reader`](../../../type-aliases/Reader.md)\<`E`, (`a`) => `B`\>

## Returns

> (`fa`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

### Parameters

#### fa

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

### Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>
