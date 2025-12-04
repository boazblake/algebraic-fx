[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderApp

# Function: renderApp()

> **renderApp**(`renderer`, `env`): \<`M`, `P`\>(`rootIO`, `program`) => [`IO`](../type-aliases/IO.md)\<\{ `destroy`: () => `void`; `dispatch`: (`payload`) => `void`; `getModel`: () => `M` \| `undefined`; \}\>

Defined in: [src/core/render.ts:48](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/render.ts#L48)

Connects a Program<M,P,E> to a DOM renderer and environment.

## Parameters

### renderer

[`Renderer`](../type-aliases/Renderer.md)

Rendering function

### env

[`DomEnv`](../type-aliases/DomEnv.md) = `...`

Environment used by Reader<E,IO<void>> effects

## Returns

IO(run) that, when executed, starts the program.

Responsibilities:
 - invoke program.init to obtain initial model & effects
 - render view(model)
 - run effects
 - process dispatches in RAF batches
 - expose { dispatch, getModel, destroy }

`dispatch` queues messages and triggers the update cycle.

> \<`M`, `P`\>(`rootIO`, `program`): [`IO`](../type-aliases/IO.md)\<\{ `destroy`: () => `void`; `dispatch`: (`payload`) => `void`; `getModel`: () => `M` \| `undefined`; \}\>

### Type Parameters

#### M

`M`

#### P

`P`

### Parameters

#### rootIO

[`IO`](../type-aliases/IO.md)\<`Element`\>

#### program

[`Program`](../type-aliases/Program.md)\<`M`, `P`, [`DomEnv`](../type-aliases/DomEnv.md)\>

### Returns

[`IO`](../type-aliases/IO.md)\<\{ `destroy`: () => `void`; `dispatch`: (`payload`) => `void`; `getModel`: () => `M` \| `undefined`; \}\>
