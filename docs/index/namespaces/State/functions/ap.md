[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / ap

# Function: ap()

> **ap**\<`S`, `A`, `B`\>(`sf`): (`sa`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

Defined in: [adt/state.ts:62](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/adt/state.ts#L62)

## Type Parameters

### S

`S`

### A

`A`

### B

`B`

## Parameters

### sf

[`State`](../interfaces/State.md)\<`S`, (`a`) => `B`\>

## Returns

> (`sa`): [`State`](../interfaces/State.md)\<`S`, `B`\>

### Parameters

#### sa

[`State`](../interfaces/State.md)\<`S`, `A`\>

### Returns

[`State`](../interfaces/State.md)\<`S`, `B`\>
