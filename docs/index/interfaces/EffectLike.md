[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / EffectLike

# Interface: EffectLike

Defined in: [src/core/types.ts:73](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/types.ts#L73)

Normalized effect representation.

Any RawEffect is normalized to one of:
- IO<void>
- Reader<E, IO<void>>
- EffectLike (object containing a .run(): void)

renderApp executes these effects after rendering each frame.

## Properties

### run()

> **run**: () => `void`

Defined in: [src/core/types.ts:74](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/types.ts#L74)

#### Returns

`void`
