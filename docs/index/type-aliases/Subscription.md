[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Subscription

# Type Alias: Subscription\<Env, Msg\>

> **Subscription**\<`Env`, `Msg`\> = `object`

Defined in: [core/effects.ts:115](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L115)

Subscription<Env, Msg>

A keyed, long-lived Effect whose lifecycle is managed
by the runtime (`renderApp`).

Subscriptions:
 - persist across renders
 - are started once per key
 - are cleaned up automatically when removed

This mirrors Elm's `Sub`.

NOTE:
Subscriptions are DECLARED here but INTERPRETED by the runtime.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Properties

### \_tag

> `readonly` **\_tag**: `"Subscription"`

Defined in: [core/effects.ts:116](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L116)

***

### effect

> `readonly` **effect**: [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:118](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L118)

***

### key

> `readonly` **key**: `string`

Defined in: [core/effects.ts:117](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/effects.ts#L117)
