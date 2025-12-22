[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<Env, Msg\>

> **RawEffect**\<`Env`, `Msg`\> = `Msg` \| [`IO`](../namespaces/IO/interfaces/IO.md)\<`Msg` \| `void`\> \| [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<`Env`, [`IO`](../namespaces/IO/interfaces/IO.md)\<`Msg` \| `void`\>\> \| [`Task`](../namespaces/Task/interfaces/Task.md)\<`unknown`, `Msg` \| `void`\> \| [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<`Env`, [`Task`](../namespaces/Task/interfaces/Task.md)\<`unknown`, `Msg` \| `void`\>\> \| [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\> \| [`Subscription`](Subscription.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:153](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/effects.ts#L153)

RawEffect<Env, Msg>

The complete set of values that may be returned from `init` or `update`.

Categories:

Cmd-like (one-shot):
 - Msg
 - IO<Msg | void>
 - Reader<Env, IO<Msg | void>>
 - Task<E, Msg | void>
 - Reader<Env, Task<E, Msg | void>>
 - Effect<Env, Msg>

Sub-like (long-lived, runtime-managed):
 - Subscription<Env, Msg>

## Type Parameters

### Env

`Env`

### Msg

`Msg`
