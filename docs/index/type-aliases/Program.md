[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Program

# Type Alias: Program\<M, Msg, Env\>

> **Program**\<`M`, `Msg`, `Env`\> = `object`

Defined in: [core/types.ts:111](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L111)

Program<M, Msg, Env>

A pure description of an application.

A Program is not executed directly. It is a declarative specification
interpreted by the algebraic-fx runtime (`renderApp`).

Semantics Summary:

 - `init`  → initial Cmd-like effects
 - `update` → Cmd-like effects after each state transition
 - `subs`  → long-lived Sub-like effects (keyed subscriptions)
 - `view`  → pure rendering

Programs never run effects themselves.
The runtime owns:
 - effect execution
 - subscription lifetimes
 - cleanup

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

Defined in: [core/types.ts:121](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L121)

init

Executed exactly once by the runtime at application startup.

Returns:
 - initial model
 - initial Cmd effects

***

### subs()?

> `optional` **subs**: (`model`) => [`Subscription`](Subscription.md)\<`Env`, `Msg`\>[]

Defined in: [core/types.ts:160](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L160)

subs (optional)

Declare long-lived subscriptions derived from the current model.

Subscriptions:
 - are keyed
 - persist across renders
 - are started/stopped by the runtime

If omitted, the program has no subscriptions.

#### Parameters

##### model

`M`

#### Returns

[`Subscription`](Subscription.md)\<`Env`, `Msg`\>[]

***

### update()

> **update**: (`msg`, `model`, `dispatch`) => `object`

Defined in: [core/types.ts:133](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L133)

update

Pure state transition:

  (msg, model, dispatch) -> { model, effects }

MUST NOT perform side effects directly.
Instead, it returns a list of Cmd-like `RawEffect` descriptions.

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

Defined in: [core/types.ts:146](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L146)

view

Pure rendering:

  (model, dispatch) -> VNode (or children)

#### Parameters

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`Msg`\>

#### Returns

[`VChild`](VChild.md) \| [`VChild`](VChild.md)[]
