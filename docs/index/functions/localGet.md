[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / localGet

# Function: localGet()

> **localGet**(`key`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`string` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:147](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/helpers/dom-helpers.ts#L147)

Read a value from `localStorage`.

Returns an IO action that:
- returns `string | null`
- logs errors (e.g. private browsing restrictions)

## Parameters

### key

`string`

Storage key.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`string` \| `null`\>\>

## Example

```ts
const stored = runDomIO(localGet("theme"), env).run();
```
