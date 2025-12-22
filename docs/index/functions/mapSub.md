[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / mapSub

# Function: mapSub()

> **mapSub**\<`Env`, `A`, `B`\>(`s`, `lift`): [`Subscription`](../type-aliases/Subscription.md)\<`Env`, `B`\>

Defined in: [core/effects.ts:371](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/effects.ts#L371)

Lift a Subscription from message type A to B.

Subscription identity (key) is preserved.

## Type Parameters

### Env

`Env`

### A

`A`

### B

`B`

## Parameters

### s

[`Subscription`](../type-aliases/Subscription.md)\<`Env`, `A`\>

### lift

(`a`) => `B`

## Returns

[`Subscription`](../type-aliases/Subscription.md)\<`Env`, `B`\>
