[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / sessionGet

# Function: sessionGet()

> **sessionGet**(`key`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`string` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:189](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/helpers/dom-helpers.ts#L189)

Read a value from `sessionStorage`.

Returns `IO<string | null>`, logging any access errors.

## Parameters

### key

`string`

Storage key.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`string` \| `null`\>\>

## Example

```ts
const token = runDomIO(sessionGet("token"), env).run();
```
