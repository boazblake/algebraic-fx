[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / map

# Function: map()

> **map**\<`S`, `A`, `B`\>(`f`): (`st`) => [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

Defined in: [adt/state.ts:103](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/state.ts#L103)

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
