[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / fx

# Function: fx()

> **fx**\<`Env`, `Msg`\>(`impl`): [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:47](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/core/effects.ts#L47)

Construct a branded Effect.

This helper hides the internal Effect brand and provides a safe way
to define long-lived effects such as subscriptions or listeners.

The provided implementation is invoked with the runtime environment
and dispatch function.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Parameters

### impl

(`env`, `dispatch`) => `void` \| () => `void`

## Returns

[`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>
