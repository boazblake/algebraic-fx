[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / sequence

# Function: sequence()

> **sequence**\<`S`, `A`\>(`states`): [`State`](../../../type-aliases/State.md)\<`S`, `A`[]\>

Defined in: [src/adt/state.ts:149](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L149)

## Type Parameters

### S

`S`

### A

`A`

## Parameters

### states

[`State`](../../../type-aliases/State.md)\<`S`, `A`\>[]

## Returns

[`State`](../../../type-aliases/State.md)\<`S`, `A`[]\>

A State that returns array of results while threading state forward.
