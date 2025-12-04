[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / localSet

# Function: localSet()

> **localSet**(`key`, `val`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

Defined in: [src/helpers/dom-helpers.ts:125](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/dom-helpers.ts#L125)

Write a value to `localStorage`.

Errors such as quota exceeded or disabled storage are logged, not thrown.

## Parameters

### key

`string`

Storage key.

### val

`string`

Value to store.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

## Example

```ts
runDomIO(localSet("theme", "dark"), env);
```
