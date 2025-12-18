[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / runEffects

# Function: runEffects()

> **runEffects**\<`Env`, `Msg`\>(`env`, `dispatch`, `effects`): () => `void`

Defined in: [core/effects.ts:151](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/effects.ts#L151)

Interpret an array of RawEffects.
Any cleanup function from subscription effects is returned as a combined disposer.

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
