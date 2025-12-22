[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Effect

# Interface: Effect\<Env, Msg\>

Defined in: [core/effects.ts:58](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L58)

Effect<Env, Msg>

A long-lived, runtime-managed side effect.

Effects represent ongoing processes such as:
 - timers
 - event listeners
 - polling loops

Effects:
 - are started by the runtime
 - receive `env` and `dispatch`
 - may return a cleanup function

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Properties

### \[EffectBrand\]

> `readonly` **\[EffectBrand\]**: `true`

Defined in: [core/effects.ts:59](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L59)

## Methods

### run()

> **run**(`env`, `dispatch`): `void` \| () => `void`

Defined in: [core/effects.ts:60](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L60)

#### Parameters

##### env

`Env`

##### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

#### Returns

`void` \| () => `void`
