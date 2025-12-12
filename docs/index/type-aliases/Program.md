[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Program

# Type Alias: Program\<M, Msg, Env\>

> **Program**\<`M`, `Msg`, `Env`\> = `object`

Defined in: [core/types.ts:269](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L269)

Pure program description for algebraic-fx.

A Program consists of:

  - `init`: IO returning `{ model, effects }`
  - `update`: pure state transition plus follow-up effects
  - `view`: pure virtual DOM renderer

The runtime calls:

  renderApp(root, program, env, renderer)

which:
  - executes `init`
  - interprets returned effects
  - renders the initial VNode tree
  - listens for dispatched messages
  - runs update loops and effects

## Type Parameters

### M

`M`

model type

### Msg

`Msg`

message union type

### Env

`Env`

environment threaded through RawEffects

## Properties

### init

> **init**: [`IO`](IO.md)\<\{ `effects`: [`RawEffect`](RawEffect.md)\<`Env`\>[]; `model`: `M`; \}\>

Defined in: [core/types.ts:270](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L270)

***

### update()

> **update**: (`msg`, `model`, `dispatch`) => `object`

Defined in: [core/types.ts:272](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L272)

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

Defined in: [core/types.ts:278](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L278)

#### Parameters

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`Msg`\>

#### Returns

[`VChild`](VChild.md) \| [`VChild`](VChild.md)[]
