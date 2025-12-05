[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderApp

# Function: renderApp()

> **renderApp**(`renderer`, `env`): \<`M`, `P`\>(`rootIO`, `program`) => [`IO`](../type-aliases/IO.md)\<\{ `destroy`: () => `void`; `dispatch`: (`payload`) => `void`; `getModel`: () => `M` \| `undefined`; \}\>

Defined in: [src/core/render.ts:42](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/render.ts#L42)

Connects a `Program<M, P, E>` to a DOM renderer and environment, producing
an `IO` that, when executed, starts the application runtime.

The runtime:
- runs `program.init` to obtain the initial model and effects
- renders the view via the provided `renderer`
- executes effects (`IOEffect`, `ReaderEffect`, or legacy `EffectLike`)
- batches dispatches using `requestAnimationFrame`

## Parameters

### renderer

[`Renderer`](../type-aliases/Renderer.md)

Rendering function that updates the DOM

### env

[`DomEnv`](../type-aliases/DomEnv.md) = `...`

Environment used by `Reader<DomEnv, IO<void>>` effects

## Returns

Function that, given a root `IO<Element>` and a `Program`,
         produces an `IO` which starts the program when run.

> \<`M`, `P`\>(`rootIO`, `program`): [`IO`](../type-aliases/IO.md)\<\{ `destroy`: () => `void`; `dispatch`: (`payload`) => `void`; `getModel`: () => `M` \| `undefined`; \}\>

### Type Parameters

#### M

`M`

#### P

`P`

### Parameters

#### rootIO

[`IO`](../type-aliases/IO.md)\<`Element`\>

An `IO` that yields the root DOM element to render into.

#### program

[`Program`](../type-aliases/Program.md)\<`M`, `P`, [`DomEnv`](../type-aliases/DomEnv.md)\>

The program definition (init, update, view).

### Returns

[`IO`](../type-aliases/IO.md)\<\{ `destroy`: () => `void`; `dispatch`: (`payload`) => `void`; `getModel`: () => `M` \| `undefined`; \}\>
