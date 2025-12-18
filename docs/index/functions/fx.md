[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / fx

# Function: fx()

> **fx**\<`Env`, `Msg`\>(`impl`): [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:25](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/effects.ts#L25)

Helper to construct an Effect without exposing the brand.

## Type Parameters

### Env

`Env`

### Msg

`Msg`

## Parameters

### impl

(`env`, `dispatch`) => `void` \| () => `void`

## Returns

[`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>
