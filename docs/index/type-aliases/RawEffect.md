[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<Env, Msg\>

> **RawEffect**\<`Env`, `Msg`\> = `Msg` \| [`IO`](../namespaces/IO/interfaces/IO.md)\<`Msg` \| `void`\> \| [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<`Env`, [`IO`](../namespaces/IO/interfaces/IO.md)\<`Msg` \| `void`\>\> \| [`Task`](../namespaces/Task/interfaces/Task.md)\<`unknown`, `Msg` \| `void`\> \| [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<`Env`, [`Task`](../namespaces/Task/interfaces/Task.md)\<`unknown`, `Msg` \| `void`\>\> \| [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\> \| [`Subscription`](Subscription.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:146](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/core/effects.ts#L146)

RawEffect<Env, Msg>

The complete set of values that may be returned from `init` or `update`.

Categories:

Cmd-like (one-shot):
 - Msg
 - IO<Msg | void>
 - Reader<Env, IO<Msg | void>>
 - Task<E, Msg | void>
 - Reader<Env, Task<E, Msg | void>>

Sub-like (long-lived):
 - Effect<Env, Msg>
 - Subscription<Env, Msg>

## Type Parameters

### Env

`Env`

### Msg

`Msg`
