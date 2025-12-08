[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / chain

# Function: chain()

> **chain**\<`S`, `A`, `B`\>(`f`): (`st`) => [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

Defined in: [adt/state.ts:109](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/state.ts#L109)

Point-free monadic chain.

## Type Parameters

### S

`S`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

## Returns

> (`st`): [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

### Parameters

#### st

[`State`](../../../type-aliases/State.md)\<`S`, `A`\>

### Returns

[`State`](../../../type-aliases/State.md)\<`S`, `B`\>
