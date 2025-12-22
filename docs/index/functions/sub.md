[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / sub

# Function: sub()

> **sub**\<`Env`, `Msg`\>(`key`, `impl`): [`Subscription`](../type-aliases/Subscription.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:107](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L107)

Construct a Subscription.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Parameters

### key

`string`

Stable identity for the subscription

### impl

(`env`, `dispatch`) => `void` \| () => `void`

## Returns

[`Subscription`](../type-aliases/Subscription.md)\<`Env`, `Msg`\>
