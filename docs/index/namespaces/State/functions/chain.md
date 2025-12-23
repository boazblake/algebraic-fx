[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / chain

# Function: chain()

> **chain**\<`S`, `A`, `B`\>(`f`): (`sa`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

Defined in: [adt/state.ts:54](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/state.ts#L54)

## Type Parameters

### S

`S`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`State`](../interfaces/State.md)\<`S`, `B`\>

## Returns

> (`sa`): [`State`](../interfaces/State.md)\<`S`, `B`\>

### Parameters

#### sa

[`State`](../interfaces/State.md)\<`S`, `A`\>

### Returns

[`State`](../interfaces/State.md)\<`S`, `B`\>
