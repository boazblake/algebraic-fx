[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<Env, Msg\>

> **RawEffect**\<`Env`, `Msg`\> = `Msg` \| [`IO`](../namespaces/IO/interfaces/IO.md)\<`Msg` \| `void`\> \| [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<`Env`, [`IO`](../namespaces/IO/interfaces/IO.md)\<`Msg` \| `void`\>\> \| [`Task`](../namespaces/Task/interfaces/Task.md)\<`unknown`, `Msg` \| `void`\> \| [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<`Env`, [`Task`](../namespaces/Task/interfaces/Task.md)\<`unknown`, `Msg` \| `void`\>\> \| [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\> \| [`Subscription`](Subscription.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:174](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/core/effects.ts#L174)

RawEffect<Env, Msg>

The complete set of values that may be returned from `init` or `update`.

RawEffects are **descriptions**, not executions.

Categories:

One-shot effects (Cmd-like):
 - Msg
 - IO<Msg | void>
 - Reader<Env, IO<Msg | void>>
 - Task<E, Msg | void>
 - Reader<Env, Task<E, Msg | void>>

Long-lived effects (Sub-like):
 - Effect<Env, Msg>
 - Subscription<Env, Msg>

## Type Parameters

### Env

`Env`

### Msg

`Msg`
