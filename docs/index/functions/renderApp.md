[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderApp

# Function: renderApp()

> **renderApp**\<`M`, `Msg`, `Env`\>(`root`, `program`, `env`, `renderer`): `void`

Defined in: [core/render.ts:88](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/render.ts#L88)

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
