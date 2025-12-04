[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / fromPromise

# Function: fromPromise()

> **fromPromise**\<`A`\>(`p`): [`Stream`](../../../type-aliases/Stream.md)\<`A`\>

Defined in: [src/adt/stream.ts:251](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/stream.ts#L251)

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
