[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / mapCmd

# Function: mapCmd()

> **mapCmd**\<`Env`, `A`, `B`\>(`eff`, `lift`): [`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `B`\>

Defined in: [core/effects.ts:284](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L284)

Lift a one-shot effect from message type A to B.

Equivalent to Elm's `Cmd.map`.

MUST NOT be used for Subscriptions.

## Type Parameters

### Env

`Env`

### A

`A`

### B

`B`

## Parameters

### eff

[`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `A`\>

### lift

(`a`) => `B`

## Returns

[`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `B`\>
