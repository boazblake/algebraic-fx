[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / ap

# Function: ap()

> **ap**\<`S`, `A`, `B`\>(`fb`): (`fa`) => [`State`](../../../type-aliases/State.md)\<`S`, `B`\>

Defined in: [adt/state.ts:115](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/state.ts#L115)

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
