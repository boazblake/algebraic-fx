[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Program

# Type Alias: Program\<M, Msg, Env\>

> **Program**\<`M`, `Msg`, `Env`\> = `object`

Defined in: [core/types.ts:187](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/types.ts#L187)

Program<M, Msg, Env>

A pure description of an application.

A Program is **not** executed directly. It is a declarative specification
that is interpreted by the algebraic-fx runtime (`renderApp`).

A Program consists of four parts:

---------------------------------------------------------------------------
init
---------------------------------------------------------------------------

An `IO` action that produces:
 - the initial application model
 - an initial list of one-shot effects

`init` is executed exactly once by the runtime at application startup.

It must be pure and deterministic.

---------------------------------------------------------------------------
update
---------------------------------------------------------------------------

A pure state transition function:

  (msg, model, dispatch) -> { model, effects }

Given:
 - a message (`Msg`)
 - the current model (`M`)
 - a dispatch function (for advanced coordination cases)

it returns:
 - a new model
 - a list of **one-shot effects** (`RawEffect`)

Important:
 - `update` MUST NOT perform side effects directly
 - it only *describes* effects as data
 - returned effects are interpreted by the runtime

---------------------------------------------------------------------------
view
---------------------------------------------------------------------------

A pure rendering function:

  (model, dispatch) -> VNode

It transforms the current model into a virtual DOM tree.

The runtime is responsible for reconciling this tree into the real DOM.

---------------------------------------------------------------------------
subs (optional)
---------------------------------------------------------------------------

A pure function that describes **long-lived subscriptions**:

  (model) -> Subscription[]

Subscriptions are:
 - persistent over time
 - keyed by identity
 - started and stopped automatically by the runtime

This mirrors Elm’s `subscriptions`:

 - When a subscription appears, the runtime starts it
 - When it disappears, the runtime cleans it up
 - Re-rendering does NOT restart subscriptions

`subs` must:
 - depend only on the model
 - return the same keys for logically identical subscriptions

---------------------------------------------------------------------------
Semantics Summary
---------------------------------------------------------------------------

 - `init`  → initial Cmd-like effects
 - `update` → one-shot Cmd-like effects
 - `subs`  → long-lived Sub-like effects
 - `view`  → pure rendering

Programs never run effects themselves.
The runtime owns:
 - effect execution
 - subscription lifetimes
 - cleanup

This separation guarantees:
 - determinism
 - testability
 - correct subscription behavior

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

Defined in: [core/types.ts:188](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/types.ts#L188)

***

### subs()?

> `optional` **subs**: (`model`) => [`Subscription`](Subscription.md)\<`Env`, `Msg`\>[]

Defined in: [core/types.ts:204](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/types.ts#L204)

Describe long-lived subscriptions derived from the current model.

This function is optional.
If omitted, the program has no subscriptions.

#### Parameters

##### model

`M`

#### Returns

[`Subscription`](Subscription.md)\<`Env`, `Msg`\>[]

***

### update()

> **update**: (`msg`, `model`, `dispatch`) => `object`

Defined in: [core/types.ts:190](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/types.ts#L190)

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

Defined in: [core/types.ts:196](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/types.ts#L196)

#### Parameters

##### model

`M`

##### dispatch

[`Dispatch`](Dispatch.md)\<`Msg`\>

#### Returns

[`VChild`](VChild.md) \| [`VChild`](VChild.md)[]
