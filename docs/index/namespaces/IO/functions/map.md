[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / map

# Function: map()

> **map**\<`A`, `B`\>(`f`): (`io`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

Defined in: [adt/io.ts:70](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/io.ts#L70)

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
