[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / gets

# Function: gets()

> **gets**\<`S`, `A`\>(`f`): [`State`](../../../type-aliases/State.md)\<`S`, `A`\>

Defined in: [src/adt/state.ts:100](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/state.ts#L100)

Extract a value from the state using `f(state)`, without modifying it.

## Type Parameters

### S

`S`

### A

`A`

## Parameters

### f

(`s`) => `A`

## Returns

[`State`](../../../type-aliases/State.md)\<`S`, `A`\>
