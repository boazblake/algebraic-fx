[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<E\>

> **RawEffect**\<`E`\> = [`IO`](IO.md)\<`void`\> \| [`Reader`](Reader.md)\<`E`, [`IO`](IO.md)\<`void`\>\> \| [`EffectLike`](../interfaces/EffectLike.md) \| [`IOEffect`](IOEffect.md) \| [`ReaderEffect`](ReaderEffect.md)\<`E`\>

Defined in: [src/core/types.ts:113](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/types.ts#L113)

Effect description accepted by the runtime.

A raw effect may be:
- IO<void>
- Reader<E, IO<void>>
- EffectLike (already normalized)
- Tagged IOEffect / ReaderEffect<E>

It is normalized inside `renderApp` into an executable effect.

## Type Parameters

### E

`E`
