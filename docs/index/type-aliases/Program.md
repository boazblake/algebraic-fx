[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Program

# Type Alias: Program\<M, P, E\>

> **Program**\<`M`, `P`, `E`\> = `object`

Defined in: [src/core/types.ts:134](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/types.ts#L134)

A pure functional application description.

A Program consists of:
- init: IO returning initial model + initial effects
- update: pure function (payload, model) => new model + effects
- view: pure function (model, dispatch) => virtual DOM tree

renderApp wires the Program to a renderer and executes the effects.

## Type Parameters

### M

`M`

Model type

### P

`P`

Message payload type

### E

`E` = [`DomEnv`](DomEnv.md)

Environment used for Reader<E,IO<void>>

## Properties

### init

> **init**: [`IO`](IO.md)\<\{ `effects`: [`RawEffect`](RawEffect.md)\<`E`\>[]; `model`: `M`; \}\>

Defined in: [src/core/types.ts:135](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/types.ts#L135)

***

### update()

> **update**: (`payload`, `model`, `dispatch`) => `object`

Defined in: [src/core/types.ts:136](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/types.ts#L136)

#### Parameters

##### payload

`P`

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`P`\>

#### Returns

`object`

##### effects

> **effects**: [`RawEffect`](RawEffect.md)\<`E`\>[]

##### model

> **model**: `M`

***

### view()

> **view**: (`model`, `dispatch`) => [`VChild`](VChild.md) \| [`VChild`](VChild.md)[]

Defined in: [src/core/types.ts:141](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/types.ts#L141)

#### Parameters

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`P`\>

#### Returns

[`VChild`](VChild.md) \| [`VChild`](VChild.md)[]
