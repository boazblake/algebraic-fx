[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Effect

# Interface: Effect\<Env, Msg\>

Defined in: [core/effects.ts:17](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/effects.ts#L17)

Long lived effect (subscriptions, streams, etc).
Return a cleanup function or void.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Properties

### \[EffectBrand\]

> `readonly` **\[EffectBrand\]**: `true`

Defined in: [core/effects.ts:18](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/effects.ts#L18)

## Methods

### run()

> **run**(`env`, `dispatch`): `void` \| () => `void`

Defined in: [core/effects.ts:19](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/effects.ts#L19)

#### Parameters

##### env

`Env`

##### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

#### Returns

`void` \| () => `void`
