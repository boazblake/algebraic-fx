[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Effect

# Interface: Effect\<Env, Msg\>

Defined in: [core/types.ts:107](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/types.ts#L107)

Effect<Env, Msg>

The primary abstraction for side effects in algebraic-fx.

Effect responsibilities:
  - read from Env (HTTP, storage, etc.)
  - perform asynchronous work
  - emit follow-up Msg values via dispatch

The runtime calls:

  effect.run(env, dispatch)

## Type Parameters

### Env

`Env` = `unknown`

environment type

### Msg

`Msg` = `unknown`

message union type for the Program

## Properties

### run()

> **run**: (`env`, `dispatch`) => `void` \| `Promise`\<`void`\>

Defined in: [core/types.ts:108](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/types.ts#L108)

#### Parameters

##### env

`Env`

##### dispatch

[`Dispatch`](../type-aliases/Dispatch.md)\<`Msg`\>

#### Returns

`void` \| `Promise`\<`void`\>
