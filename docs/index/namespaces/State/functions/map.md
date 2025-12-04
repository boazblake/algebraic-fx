[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / map

# Function: map()

> **map**\<`S`, `A`, `B`\>(`f`): (`st`) => [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

Defined in: [src/adt/state.ts:103](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L103)

Point-free functor map.

## Type Parameters

### S

`S`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => `B`

## Returns

> (`st`): [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

### Parameters

#### st

[`State`](../../../type-aliases/State.md)\<`S`, `A`\>

### Returns

[`State`](../../../type-aliases/State.md)\<`S`, `B`\>
