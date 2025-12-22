[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / runEffects

# Function: runEffects()

## Call Signature

> **runEffects**\<`Env`, `Msg`\>(`env`, `dispatch`, `effects`): () => `void`

Defined in: [core/effects.ts:206](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/core/effects.ts#L206)

Interpret Cmd-like RawEffects.

IMPORTANT:
- Subscriptions are IGNORED here
- This function is PURE and STATELESS
- Subscription lifecycle is handled by the runtime (`renderApp`)

Canonical call form:
  runEffects(env, dispatch, effects)

### Type Parameters

#### Env

`Env`

#### Msg

`Msg`

### Parameters

#### env

`Env`

#### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

#### effects

readonly [`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `Msg`\>[] | `undefined`

### Returns

A disposer that runs all collected cleanup functions from Effects.

> (): `void`

#### Returns

`void`

## Call Signature

> **runEffects**\<`Env`, `Msg`\>(`env`, `effects`, `dispatch`): () => `void`

Defined in: [core/effects.ts:218](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/core/effects.ts#L218)

Compatibility overload:
  runEffects(env, effects, dispatch)

This keeps older call sites/benchmarks working without changing semantics.

### Type Parameters

#### Env

`Env`

#### Msg

`Msg`

### Parameters

#### env

`Env`

#### effects

readonly [`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `Msg`\>[] | `undefined`

#### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

### Returns

> (): `void`

#### Returns

`void`
