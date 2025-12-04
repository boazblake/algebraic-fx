[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / sequence

# Function: sequence()

> **sequence**\<`S`, `A`\>(`states`): [`State`](../../../type-aliases/State.md)\<`S`, `A`[]\>

Defined in: [src/adt/state.ts:149](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/state.ts#L149)

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
