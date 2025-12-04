[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / traverse

# Function: traverse()

> **traverse**\<`S`, `A`, `B`\>(`f`): (`arr`) => [`State`](../../../type-aliases/State.md)\<`S`, `B`[]\>

Defined in: [src/adt/state.ts:167](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/state.ts#L167)

Traverse an array using a function that returns a State.
Equivalent to: `State.sequence(arr.map(f))`.

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

> (`arr`): [`State`](../../../type-aliases/State.md)\<`S`, `B`[]\>

### Parameters

#### arr

`A`[]

### Returns

[`State`](../../../type-aliases/State.md)\<`S`, `B`[]\>
