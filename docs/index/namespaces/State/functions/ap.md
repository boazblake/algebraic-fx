[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / ap

# Function: ap()

> **ap**\<`S`, `A`, `B`\>(`sf`): (`sa`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

Defined in: [adt/state.ts:62](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/adt/state.ts#L62)

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
