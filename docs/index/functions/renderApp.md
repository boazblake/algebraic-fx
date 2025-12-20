[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderApp

# Function: renderApp()

> **renderApp**\<`M`, `Msg`, `Env`\>(`root`, `program`, `env`, `renderer`): `void`

Defined in: [core/render.ts:53](https://github.com/boazblake/algebraic-fx/blob/826d02590af9eca22bdc84de6a66e66b29df7b7d/src/core/render.ts#L53)

Start an algebraic-fx application.

This function wires together:
 - a Program (init / update / view)
 - a renderer
 - an environment value

IMPORTANT SEMANTICS:
 - This function is NOT curried.
 - This function does NOT return an IO.
 - The runtime starts immediately.

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

Root DOM element to render into

### program

[`Program`](../type-aliases/Program.md)\<`M`, `Msg`, `Env`\>

Application Program definition

### env

`Env`

Environment value passed to effects

### renderer

[`Renderer`](../type-aliases/Renderer.md)

Virtual DOM renderer

## Returns

`void`

## Throws

TypeError if any required argument is missing or invalid
