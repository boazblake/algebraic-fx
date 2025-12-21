[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<Env, Msg\>

> **RawEffect**\<`Env`, `Msg`\> = `Msg` \| [`IO`](../namespaces/IO/interfaces/IO.md)\<`Msg` \| `void`\> \| [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<`Env`, [`IO`](../namespaces/IO/interfaces/IO.md)\<`Msg` \| `void`\>\> \| [`Task`](../namespaces/Task/interfaces/Task.md)\<`unknown`, `Msg` \| `void`\> \| [`Reader`](../namespaces/Reader/interfaces/Reader.md)\<`Env`, [`Task`](../namespaces/Task/interfaces/Task.md)\<`unknown`, `Msg` \| `void`\>\> \| [`Effect`](../interfaces/Effect.md)\<`Env`, `Msg`\>

Defined in: [core/effects.ts:82](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/core/effects.ts#L82)

RawEffect represents any side-effect description a Program may emit.

RawEffects are *data*, not executions.
They are interpreted by the runtime after each update and during init.

Supported forms:

 - Msg
     Dispatches the message immediately.

 - IO<Msg | void>
     Executed synchronously.
     If a Msg is returned, it is dispatched.

 - Reader<Env, IO<Msg | void>>
     Environment-dependent synchronous effect.

 - Task<E, Msg | void>
     Fire-and-forget asynchronous computation.
     Only successful results are dispatched.

 - Reader<Env, Task<E, Msg | void>>
     Environment-dependent asynchronous computation.

 - Effect<Env, Msg>
     Long-lived subscription effect with optional cleanup.

## Type Parameters

### Env

`Env`

### Msg

`Msg`
