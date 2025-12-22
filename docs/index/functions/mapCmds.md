[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / mapCmds

# Function: mapCmds()

> **mapCmds**\<`Env`, `A`, `B`\>(`effects`, `lift`): [`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `B`\>[]

Defined in: [core/effects.ts:356](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/core/effects.ts#L356)

Map a list of Cmd-like effects.

## Type Parameters

### Env

`Env`

### A

`A`

### B

`B`

## Parameters

### effects

readonly [`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `A`\>[]

### lift

(`a`) => `B`

## Returns

[`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `B`\>[]
