[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / sessionSet

# Function: sessionSet()

> **sessionSet**(`key`, `val`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`void`\>\>

Defined in: [src/helpers/dom-helpers.ts:169](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/helpers/dom-helpers.ts#L169)

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
