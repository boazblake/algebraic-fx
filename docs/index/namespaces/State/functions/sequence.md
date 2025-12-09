[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / sequence

# Function: sequence()

> **sequence**\<`S`, `A`\>(`states`): [`State`](../../../type-aliases/State.md)\<`S`, `A`[]\>

Defined in: [adt/state.ts:149](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/state.ts#L149)

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
