[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderApp

# Function: renderApp()

> **renderApp**\<`M`, `Msg`, `Env`\>(`root`, `program`, `env`, `renderer`): `void`

Defined in: [core/render.ts:86](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/render.ts#L86)

Connect Program<M,Msg,Env> to a renderer and environment.

Flow:
  1. Run program.init
  2. Render initial view
  3. Run initial effects
  4. Return closed-over dispatch for user events

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
