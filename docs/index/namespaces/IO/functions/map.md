[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / map

# Function: map()

> **map**\<`A`, `B`\>(`f`): (`io`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

Defined in: [src/adt/io.ts:70](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/io.ts#L70)

Point-free functor map.

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => `B`

## Returns

> (`io`): [`IO`](../../../type-aliases/IO.md)\<`B`\>

### Parameters

#### io

[`IO`](../../../type-aliases/IO.md)\<`A`\>

### Returns

[`IO`](../../../type-aliases/IO.md)\<`B`\>
