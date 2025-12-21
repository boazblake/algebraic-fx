[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Effect

# Interface: Effect\<Env, Msg\>

Defined in: [core/effects.ts:63](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L63)

Effect<Env, Msg>

A long-lived, runtime-managed side effect.

Effects represent **ongoing processes** such as:
 - timers
 - event listeners
 - polling loops

Effects:
 - are started by the runtime
 - receive `env` and `dispatch`
 - may return a cleanup function

Effects are NOT executed immediately.
They are returned as descriptions from `init` or `update`.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Properties

### \[EffectBrand\]

> `readonly` **\[EffectBrand\]**: `true`

Defined in: [core/effects.ts:64](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L64)

## Methods

### run()

> **run**(`env`, `dispatch`): `void` \| () => `void`

Defined in: [core/effects.ts:73](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L73)

Start the effect.

#### Parameters

##### env

`Env`

Runtime environment

##### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

Message dispatcher

#### Returns

`void` \| () => `void`

Optional cleanup function
