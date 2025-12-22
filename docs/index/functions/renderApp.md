[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderApp

# Function: renderApp()

> **renderApp**\<`M`, `Msg`, `Env`\>(`root`, `program`, `env`, `renderer`): `void`

Defined in: [core/render.ts:89](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/render.ts#L89)

renderApp

Start an algebraic-fx application runtime loop.

Responsibilities:
- run init once
- render view on init and after every update
- run Cmd effects returned by init/update via runEffects
- manage subscription lifecycle via Program.subs(model)

IMPORTANT:
- update must be pure (no direct side effects)
- all side effects must be described as Cmd effects (init/update)
- all long-lived behavior must be described as Subscriptions (subs)

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

### program

[`Program`](../type-aliases/Program.md)\<`M`, `Msg`, `Env`\>

### env

`Env`

### renderer

[`Renderer`](../type-aliases/Renderer.md)

## Returns

`void`
