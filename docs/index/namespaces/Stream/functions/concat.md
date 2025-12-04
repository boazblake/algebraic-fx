[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / concat

# Function: concat()

> **concat**\<`A`\>(`s1`, `s2`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:318](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/stream.ts#L318)

Concatenate two streams:
- consume s1 fully
- then subscribe to s2

## Type Parameters

### A

`A`

## Parameters

### s1

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>

### s2

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>

## Returns

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>
