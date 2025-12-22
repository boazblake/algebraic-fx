[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / mapCmds

# Function: mapCmds()

> **mapCmds**\<`Env`, `A`, `B`\>(`effects`, `lift`): [`RawEffect`](../type-aliases/RawEffect.md)\<`Env`, `B`\>[]

Defined in: [core/effects.ts:317](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L317)

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
