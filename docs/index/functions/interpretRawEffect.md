[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / interpretRawEffect

# Function: interpretRawEffect()

> **interpretRawEffect**\<`Env`, `Msg`\>(`env`, `dispatch`, `eff`): `void` \| () => `void`

Defined in: [core/effects.ts:91](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/effects.ts#L91)

Interpret a single RawEffect:
 - synchronously for IO / Reader<IO>
 - fire and forget for Task / Reader<Task>
 - delegate to Effect.run for subscriptions
 - if given a plain Msg, dispatches it directly

Returns a cleanup function only for Effect cases; all others return void.

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
