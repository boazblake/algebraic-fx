[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Subscription

# Type Alias: Subscription\<Env, Msg\>

> **Subscription**\<`Env`, `Msg`\> = `object`

Defined in: [core/effects.ts:101](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/effects.ts#L101)

Subscription<Env, Msg>

A keyed, long-lived Effect whose lifecycle is managed by the runtime.

Subscriptions:
 - persist across renders
 - are started once per key
 - are cleaned up automatically when removed

Mirrors Elm's `Sub`.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Properties

### \_tag

> `readonly` **\_tag**: `"Subscription"`

Defined in: [core/effects.ts:102](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/effects.ts#L102)

***

### effect

> `readonly` **effect**: [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:104](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/effects.ts#L104)

***

### key

> `readonly` **key**: `string`

Defined in: [core/effects.ts:103](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/effects.ts#L103)
