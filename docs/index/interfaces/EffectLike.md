[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / EffectLike

# Interface: EffectLike

Defined in: [src/core/types.ts:73](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/types.ts#L73)

Normalized effect representation.

Any RawEffect is normalized to one of:
- IO<void>
- Reader<E, IO<void>>
- EffectLike (object containing a .run(): void)

renderApp executes these effects after rendering each frame.

## Properties

### run()

> **run**: () => `void`

Defined in: [src/core/types.ts:74](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/types.ts#L74)

#### Returns

`void`
