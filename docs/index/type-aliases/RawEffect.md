[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<E\>

> **RawEffect**\<`E`\> = [`IO`](IO.md)\<`void`\> \| [`Reader`](Reader.md)\<`E`, [`IO`](IO.md)\<`void`\>\> \| [`Effect`](../interfaces/Effect.md)\<`E`, `any`\> \| [`IOEffect`](IOEffect.md) \| [`ReaderEffect`](ReaderEffect.md)\<`E`\>

Defined in: [core/types.ts:167](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/types.ts#L167)

RawEffect<E>

Normalized effect representation understood by the runtime:
  - IO<void>
  - Reader<E, IO<void>>
  - Effect<Env, Msg>
  - IOEffect
  - ReaderEffect<E>

Env is threaded by the runtime, Msg is program-specific.

## Type Parameters

### E

`E`
