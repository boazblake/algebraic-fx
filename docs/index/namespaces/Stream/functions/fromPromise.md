[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`A`\>(`p`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [adt/stream.ts:250](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L250)

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
