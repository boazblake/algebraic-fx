[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<E\>

> **RawEffect**\<`E`\> = [`IO`](IO.md)\<`void`\> \| [`Reader`](Reader.md)\<`E`, [`IO`](IO.md)\<`void`\>\> \| [`Effect`](../interfaces/Effect.md)\<`E`, `any`\> \| [`IOEffect`](IOEffect.md) \| [`ReaderEffect`](ReaderEffect.md)\<`E`\>

Defined in: [core/types.ts:149](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L149)

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
