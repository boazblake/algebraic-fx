[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Program

# Type Alias: Program\<M, Msg, Env\>

> **Program**\<`M`, `Msg`, `Env`\> = `object`

Defined in: [core/types.ts:53](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/types.ts#L53)

Program<M, Msg, Env>

 - init: IO<{ model, effects }>
 - update: pure state transition plus follow up effects
 - view: pure virtual DOM renderer

## Type Parameters

### M

`M`

### Msg

`Msg`

### Env

`Env`

## Properties

### init

> **init**: [`IO`](../namespaces/IO/interfaces/IO.md)\<\{ `effects`: [`RawEffect`](RawEffect.md)\<`Env`, `Msg`\>[]; `model`: `M`; \}\>

Defined in: [core/types.ts:54](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/types.ts#L54)

***

### update()

> **update**: (`msg`, `model`, `dispatch`) => `object`

Defined in: [core/types.ts:56](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/types.ts#L56)

#### Parameters

##### msg

`Msg`

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`Msg`\>

#### Returns

`object`

##### effects

> **effects**: [`RawEffect`](RawEffect.md)\<`Env`, `Msg`\>[]

##### model

> **model**: `M`

***

### view()

> **view**: (`model`, `dispatch`) => [`VChild`](VChild.md) \| [`VChild`](VChild.md)[]

Defined in: [core/types.ts:62](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/core/types.ts#L62)

#### Parameters

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`Msg`\>

#### Returns

[`VChild`](VChild.md) \| [`VChild`](VChild.md)[]
