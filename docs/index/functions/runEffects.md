[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / runEffects

# Function: runEffects()

> **runEffects**\<`Env`, `Msg`\>(`effects`, `env`, `dispatch`): `void`

Defined in: [core/render.ts:46](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/render.ts#L46)

Execute a list of RawEffect<Env> against the current environment.

Supported forms:
  - IOEffect
  - ReaderEffect<Env>
  - Effect<Env,Msg>

CORRECTED: Added runtime validation for dispatch and env

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
