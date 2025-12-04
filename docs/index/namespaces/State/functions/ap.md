[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / ap

# Function: ap()

> **ap**\<`S`, `A`, `B`\>(`fb`): (`fa`) => [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

Defined in: [src/adt/state.ts:115](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/state.ts#L115)

Point-free applicative apply.

## Type Parameters

### S

`S`

### A

`A`

### B

`B`

## Parameters

### fb

[`State`](../../../type-aliases/State.md)\<`S`, (`a`) => `B`\>

## Returns

> (`fa`): [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

### Parameters

#### fa

[`State`](../../../type-aliases/State.md)\<`S`, `A`\>

### Returns

[`State`](../../../type-aliases/State.md)\<`S`, `B`\>
