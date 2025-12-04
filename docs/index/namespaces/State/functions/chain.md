[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / chain

# Function: chain()

> **chain**\<`S`, `A`, `B`\>(`f`): (`st`) => [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

Defined in: [src/adt/state.ts:109](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/state.ts#L109)

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
