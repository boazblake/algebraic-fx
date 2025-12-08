[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`A`\>(`p`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [adt/stream.ts:250](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/adt/stream.ts#L250)

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
