[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / ap

# Function: ap()

> **ap**\<`E`, `A`, `B`\>(`fb`): (`fa`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

Defined in: [adt/reader.ts:96](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/reader.ts#L96)

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
