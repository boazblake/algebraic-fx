[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / ap

# Function: ap()

> **ap**\<`S`, `A`, `B`\>(`sf`): (`sa`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

Defined in: [adt/state.ts:62](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/adt/state.ts#L62)

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
