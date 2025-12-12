[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Effect

# Interface: Effect\<Env, Msg\>

Defined in: [core/types.ts:126](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L126)

Effects describe side-effects in algebraic-fx.

They can:
  - read from Env (browser APIs, storage, WebSocket, etc.)
  - perform synchronous or async work
  - optionally emit new Msg values via dispatch
  - optionally return a cleanup function

The runtime interpreter invokes:

  effect.run(env, dispatch)

where:
  - `env` is the environment given to `renderApp`
  - `dispatch` sends follow-up messages into the Program

## Type Parameters

### Env

`Env` = `unknown`

### Msg

`Msg` = `unknown`

## Properties

### run()

> **run**: (`env`, `dispatch`) => `void` \| `Promise`\<`void`\> \| `Promise`\<() => `void`\> \| () => `void`

Defined in: [core/types.ts:127](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L127)

#### Parameters

##### env

`Env`

##### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

#### Returns

`void` \| `Promise`\<`void`\> \| `Promise`\<() => `void`\> \| () => `void`
