[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / chain

# Function: chain()

> **chain**\<`A`, `B`\>(`f`): \<`R`\>(`fa`) => [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

Defined in: [adt/reader.ts:121](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/adt/reader.ts#L121)

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Reader`](../interfaces/Reader.md)\<`any`, `B`\>

## Returns

> \<`R`\>(`fa`): [`Reader`](../interfaces/Reader.md)\<`R`, `B`\>

### Type Parameters

#### R

`R`

### Parameters

#### fa

[`Reader`](../interfaces/Reader.md)\<`R`, `A`\>

### Returns

[`Reader`](../interfaces/Reader.md)\<`R`, `B`\>
