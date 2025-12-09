[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Program

# Type Alias: Program\<M, Msg, Env\>

> **Program**\<`M`, `Msg`, `Env`\> = `object`

Defined in: [core/types.ts:176](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L176)

Pure functional application description.

init:
  IO<{ model; effects }>

update:
  (msg, model, dispatch) => { model; effects }

view:
  (model, dispatch) => vnode

## Type Parameters

### M

`M`

model type

### Msg

`Msg`

message union type

### Env

`Env`

environment type used by Reader and Effect

## Properties

### init

> **init**: [`IO`](IO.md)\<\{ `effects`: [`RawEffect`](RawEffect.md)\<`Env`\>[]; `model`: `M`; \}\>

Defined in: [core/types.ts:177](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L177)

***

### update()

> **update**: (`msg`, `model`, `dispatch`) => `object`

Defined in: [core/types.ts:178](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L178)

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

> **effects**: [`RawEffect`](RawEffect.md)\<`Env`\>[]

##### model

> **model**: `M`

***

### view()

> **view**: (`model`, `dispatch`) => [`VChild`](VChild.md) \| [`VChild`](VChild.md)[]

Defined in: [core/types.ts:183](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L183)

#### Parameters

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`Msg`\>

#### Returns

[`VChild`](VChild.md) \| [`VChild`](VChild.md)[]
