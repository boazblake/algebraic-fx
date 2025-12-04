[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / EffectLike

# Interface: EffectLike

Defined in: [src/core/types.ts:73](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/core/types.ts#L73)

Normalized effect representation.

Any RawEffect is normalized to one of:
- IO<void>
- Reader<E, IO<void>>
- EffectLike (object containing a .run(): void)

renderApp executes these effects after rendering each frame.

## Properties

### run()

> **run**: () => `void`

Defined in: [src/core/types.ts:74](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/core/types.ts#L74)

#### Returns

`void`
