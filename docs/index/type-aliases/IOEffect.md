[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / IOEffect

# Type Alias: IOEffect

> **IOEffect** = `object`

Defined in: [core/types.ts:191](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L191)

Wraps `IO<void>` as a runtime effect.

The interpreter extracts the underlying IO and executes it.

## Properties

### \_tag

> **\_tag**: *typeof* [`IOEffectTag`](../variables/IOEffectTag.md)

Defined in: [core/types.ts:192](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L192)

***

### io

> **io**: [`IO`](IO.md)\<`void`\>

Defined in: [core/types.ts:193](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L193)
