[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`A`\>(`p`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:251](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/stream.ts#L251)

Convert a Promise into a Stream emitting one value then completing.
Unsubscription cancels the resolution (ignores result/error).

## Type Parameters

### A

`A`

## Parameters

### p

`Promise`\<`A`\>

## Returns

[`Stream`](../../../type-aliases/Stream.md)\<`A`\>
