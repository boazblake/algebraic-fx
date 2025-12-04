[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / sessionSet

# Function: sessionSet()

> **sessionSet**(`key`, `val`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

Defined in: [src/helpers/dom-helpers.ts:169](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/dom-helpers.ts#L169)

Write a value to `sessionStorage`.

Errors are logged and ignored.

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
runDomIO(sessionSet("token", "abc123"), env);
```
