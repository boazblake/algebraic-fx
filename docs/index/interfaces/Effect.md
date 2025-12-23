[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Effect

# Interface: Effect\<Env, Msg\>

Defined in: [core/effects.ts:62](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/core/effects.ts#L62)

Effect<Env, Msg>

A long-lived, runtime-invoked side effect.

Effects represent ongoing processes such as:
 - timers
 - event listeners
 - polling loops

Effects:
 - are started by the runtime
 - receive `env` and `dispatch`
 - may return a cleanup function

NOTE:
`Effect` values are allowed as Cmd-like results from `init`/`update`.
If you want keyed lifecycle management, wrap an Effect in a `Subscription`.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Properties

### \[EffectBrand\]

> `readonly` **\[EffectBrand\]**: `true`

Defined in: [core/effects.ts:63](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/core/effects.ts#L63)

## Methods

### run()

> **run**(`env`, `dispatch`): `void` \| () => `void`

Defined in: [core/effects.ts:64](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/core/effects.ts#L64)

#### Parameters

##### env

`Env`

##### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

#### Returns

`void` \| () => `void`
