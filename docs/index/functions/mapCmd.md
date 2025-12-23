[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / mapCmd

# Function: mapCmd()

> **mapCmd**\<`Env`, `A`, `B`\>(`eff`, `lift`): [`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `B`\>

Defined in: [core/effects.ts:318](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/effects.ts#L318)

Lift a one-shot (Cmd-like) RawEffect from message type A to B.

Equivalent to Elm's `Cmd.map`.

IMPORTANT:
- Subscriptions MUST NOT be passed here.
- For subscriptions, use `mapSub` / `mapSubs`.

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
