[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / runEffects

# Function: runEffects()

> **runEffects**\<`Env`, `Msg`\>(`env`, `dispatch`, `effects`): () => `void`

Defined in: [core/effects.ts:226](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L226)

Interpret one-shot RawEffects.

IMPORTANT:
- Subscriptions are IGNORED here
- This function is PURE and STATELESS
- No lifecycle or diffing occurs

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

Combined cleanup for Effect values only

> (): `void`

### Returns

`void`
