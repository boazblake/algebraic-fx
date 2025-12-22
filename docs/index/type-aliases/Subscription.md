[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Subscription

# Type Alias: Subscription\<Env, Msg\>

> **Subscription**\<`Env`, `Msg`\> = `object`

Defined in: [core/effects.ts:96](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L96)

Subscription<Env, Msg>

A keyed, long-lived Effect whose lifecycle is managed
by the runtime (`renderApp`).

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

Defined in: [core/effects.ts:97](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L97)

***

### effect

> `readonly` **effect**: [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:99](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L99)

***

### key

> `readonly` **key**: `string`

Defined in: [core/effects.ts:98](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L98)
