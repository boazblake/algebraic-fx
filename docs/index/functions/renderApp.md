[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderApp

# Function: renderApp()

> **renderApp**\<`M`, `Msg`, `Env`\>(`root`, `program`, `env`, `renderer`): `void`

Defined in: [core/render.ts:120](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/render.ts#L120)

Start an algebraic-fx application.

This is the **only imperative runtime loop** in the framework.

Responsibilities:
 - execute `Program.init` exactly once
 - render the initial view
 - handle `dispatch(msg)` → update → view
 - interpret one-shot effects (Cmd)
 - manage subscription lifecycle (Sub)

IMPORTANT SEMANTICS:
 - `renderApp` is NOT curried
 - `renderApp` does NOT return an IO
 - the runtime starts immediately

Subscription semantics (Elm-style):
 - subscriptions are keyed
 - started once per key
 - cleaned up automatically when removed

## Type Parameters

### M

`M`

### Msg

`Msg`

### Env

`Env`

## Parameters

### root

`Element`

Root DOM element

### program

[`Program`](../type-aliases/Program.md)\<`M`, `Msg`, `Env`\>

Application Program definition

### env

`Env`

Runtime environment

### renderer

[`Renderer`](../type-aliases/Renderer.md)

Virtual DOM renderer

## Returns

`void`
