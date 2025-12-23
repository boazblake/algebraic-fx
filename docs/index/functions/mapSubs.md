[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / mapSubs

# Function: mapSubs()

> **mapSubs**\<`Env`, `A`, `B`\>(`subs`, `lift`): [`Subscription`](../type-aliases/Subscription.md)\<`Env`, `B`\>[]

Defined in: [core/effects.ts:383](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/effects.ts#L383)

Map a list of Subscriptions.

## Type Parameters

### Env

`Env`

### A

`A`

### B

`B`

## Parameters

### subs

readonly [`Subscription`](../type-aliases/Subscription.md)\<`Env`, `A`\>[]

### lift

(`a`) => `B`

## Returns

[`Subscription`](../type-aliases/Subscription.md)\<`Env`, `B`\>[]
