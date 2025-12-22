[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / runEffects

# Function: runEffects()

> **runEffects**\<`Env`, `Msg`\>(`env`, `dispatch`, `effects`): () => `void`

Defined in: [core/effects.ts:195](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L195)

Interpret one-shot RawEffects.

IMPORTANT:
- Subscriptions are IGNORED here
- This function is PURE and STATELESS

Subscription lifecycle is handled by the runtime (`renderApp`).

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Parameters

### env

`Env`

### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

### effects

readonly [`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `Msg`\>[] | `undefined`

## Returns

> (): `void`

### Returns

`void`
