[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / runEffects

# Function: runEffects()

> **runEffects**\<`Env`, `Msg`\>(`env`, `dispatch`, `effects`): () => `void`

Defined in: [core/effects.ts:207](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/core/effects.ts#L207)

Interpret a list of RawEffects.

All effects are executed in order.
Cleanup functions returned by Effect values are collected and
combined into a single disposer function.

The returned disposer invokes all cleanups safely.

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

[`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `Msg`\>[] | `undefined`

## Returns

> (): `void`

### Returns

`void`
