[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / ReaderEffect

# Type Alias: ReaderEffect\<E\>

> **ReaderEffect**\<`E`\> = `object`

Defined in: [core/types.ts:212](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L212)

Wraps `Reader<Env, IO<void>>` as a runtime effect.

The interpreter:
  1. Applies the Reader with the current environment.
  2. Executes the resulting IO<void>.

## Type Parameters

### E

`E`

## Properties

### \_tag

> **\_tag**: *typeof* [`ReaderEffectTag`](../variables/ReaderEffectTag.md)

Defined in: [core/types.ts:213](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L213)

***

### reader

> **reader**: [`Reader`](Reader.md)\<`E`, [`IO`](IO.md)\<`void`\>\>

Defined in: [core/types.ts:214](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L214)
