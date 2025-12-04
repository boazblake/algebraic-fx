[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / chain

# Function: chain()

> **chain**\<`A`, `B`\>(`f`): (`io`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

Defined in: [src/adt/io.ts:78](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L78)

Point-free monadic chain.

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

## Returns

> (`io`): [`IO`](../../../type-aliases/IO.md)\<`B`\>

### Parameters

#### io

[`IO`](../../../type-aliases/IO.md)\<`A`\>

### Returns

[`IO`](../../../type-aliases/IO.md)\<`B`\>
