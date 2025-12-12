[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderApp

# Function: renderApp()

> **renderApp**\<`M`, `Msg`, `Env`\>(`root`, `program`, `env`, `renderer`): `void`

Defined in: [core/render.ts:128](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/render.ts#L128)

Connect Program<M,Msg,Env> to a renderer and environment.

Flow:
  1. Run program.init
  2. Render initial view
  3. Run initial effects
  4. Return closed-over dispatch for user events

CORRECTED: Added validation and error handling

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

DOM root element

### program

[`Program`](../type-aliases/Program.md)\<`M`, `Msg`, `Env`\>

functional program

### env

`Env`

environment passed to effects

### renderer

[`Renderer`](../type-aliases/Renderer.md)

renderer function

## Returns

`void`
