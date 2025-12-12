[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<E\>

> **RawEffect**\<`E`\> = [`IO`](IO.md)\<`void`\> \| [`Reader`](Reader.md)\<`E`, [`IO`](IO.md)\<`void`\>\> \| [`Effect`](../interfaces/Effect.md)\<`E`, `any`\> \| [`IOEffect`](IOEffect.md) \| [`ReaderEffect`](ReaderEffect.md)\<`E`\>

Defined in: [core/types.ts:234](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L234)

Comprehensive union of all effect representations understood by the runtime.

These forms allow a wide range of effect expressions:

  - `IO<void>`                   — simple synchronous actions
  - `Reader<E, IO<void>>`       — environment-dependent IO
  - `Effect<Env, Msg>`          — full effects with `env` + `dispatch`
  - `IOEffect`                  — tagged IO wrappers
  - `ReaderEffect<E>`           — tagged Reader wrappers

Env is threaded automatically by the runtime. Msg is program-specific.

## Type Parameters

### E

`E`
