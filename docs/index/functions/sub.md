[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / sub

# Function: sub()

> **sub**\<`Env`, `Msg`\>(`key`, `impl`): [`Subscription`](../type-aliases/Subscription.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:112](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/core/effects.ts#L112)

Construct a Subscription.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Parameters

### key

`string`

Stable identity for the subscription.

### impl

(`env`, `dispatch`) => `void` \| () => `void`

## Returns

[`Subscription`](../type-aliases/Subscription.md)\<`Env`, `Msg`\>
