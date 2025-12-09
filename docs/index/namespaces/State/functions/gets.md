[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / gets

# Function: gets()

> **gets**\<`S`, `A`\>(`f`): [`State`](../../../type-aliases/State.md)\<`S`, `A`\>

Defined in: [adt/state.ts:100](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/state.ts#L100)

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
