[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / chain

# Function: chain()

> **chain**\<`E`, `A`, `B`\>(`f`): (`r`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

Defined in: [src/adt/reader.ts:88](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/reader.ts#L88)

Point-free chain.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

## Returns

> (`r`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

### Parameters

#### r

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `A`\>

### Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>
