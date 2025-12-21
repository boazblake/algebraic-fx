[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Program

# Type Alias: Program\<M, Msg, Env\>

> **Program**\<`M`, `Msg`, `Env`\> = `object`

Defined in: [core/types.ts:109](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/core/types.ts#L109)

Program<M, Msg, Env>

A pure description of an application.

A Program consists of:

 - init:
     An IO that produces the initial model and initial effects.

 - update:
     A pure function that transforms (Msg, Model) into:
       - a new Model
       - a list of RawEffect values

 - view:
     A pure function that renders the Model into a virtual DOM tree.

Programs do not perform effects directly.
All effects are described as data and interpreted by the runtime.

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

Defined in: [core/types.ts:110](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/core/types.ts#L110)

***

### update()

> **update**: (`msg`, `model`, `dispatch`) => `object`

Defined in: [core/types.ts:112](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/core/types.ts#L112)

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

Defined in: [core/types.ts:118](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/core/types.ts#L118)

#### Parameters

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`Msg`\>

#### Returns

[`VChild`](VChild.md) \| [`VChild`](VChild.md)[]
