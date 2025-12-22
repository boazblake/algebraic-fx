[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / mapSub

# Function: mapSub()

> **mapSub**\<`Env`, `A`, `B`\>(`sub`, `lift`): [`Subscription`](../type-aliases/Subscription.md)\<`Env`, `B`\>

Defined in: [core/effects.ts:332](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L332)

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

### sub

[`Subscription`](../type-aliases/Subscription.md)\<`Env`, `A`\>

### lift

(`a`) => `B`

## Returns

[`Subscription`](../type-aliases/Subscription.md)\<`Env`, `B`\>
