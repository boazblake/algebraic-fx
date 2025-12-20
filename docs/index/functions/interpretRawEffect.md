[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / interpretRawEffect

# Function: interpretRawEffect()

> **interpretRawEffect**\<`Env`, `Msg`\>(`env`, `dispatch`, `eff`): `void` \| () => `void`

Defined in: [core/effects.ts:142](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/core/effects.ts#L142)

Interpret a single RawEffect.

Execution semantics:
 - Msg:
     Dispatched immediately.

 - IO / Reader<IO>:
     Executed synchronously.
     Any returned Msg is dispatched.

 - Task / Reader<Task>:
     Executed asynchronously (fire-and-forget).
     Only successful results are dispatched.

 - Effect:
     Delegated to Effect.run.
     May return a cleanup function.

Returns a cleanup function only for Effect cases.

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

### eff

[`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `Msg`\>

## Returns

`void` \| () => `void`
