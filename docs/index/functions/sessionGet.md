[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / sessionGet

# Function: sessionGet()

> **sessionGet**(`key`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`string` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:189](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/helpers/dom-helpers.ts#L189)

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
