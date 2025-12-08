[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / runEffects

# Function: runEffects()

> **runEffects**\<`Env`, `Msg`\>(`effects`, `env`, `dispatch`): `void`

Defined in: [core/render.ts:44](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/render.ts#L44)

Execute a list of RawEffect<Env> against the current environment.

Supported forms:
  - IOEffect
  - ReaderEffect<Env>
  - Effect<Env,Msg>

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Parameters

### effects

list of effects to run

[`RawEffect`](../type-aliases/RawEffect.md)\<`Env`\>[] | `undefined`

### env

`Env`

environment for Readers and Effects

### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

dispatch function for messages emitted by Effects

## Returns

`void`
