[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / gets

# Function: gets()

> **gets**\<`S`, `A`\>(`f`): [`State`](../../../type-aliases/State.md)\<`S`, `A`\>

Defined in: [src/adt/state.ts:100](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L100)

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
