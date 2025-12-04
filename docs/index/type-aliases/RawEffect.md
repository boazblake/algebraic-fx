[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / RawEffect

# Type Alias: RawEffect\<E\>

> **RawEffect**\<`E`\> = [`IO`](IO.md)\<`void`\> \| [`Reader`](Reader.md)\<`E`, [`IO`](IO.md)\<`void`\>\> \| [`EffectLike`](../interfaces/EffectLike.md) \| [`IOEffect`](IOEffect.md) \| [`ReaderEffect`](ReaderEffect.md)\<`E`\>

Defined in: [src/core/types.ts:113](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/types.ts#L113)

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
