[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / localGet

# Function: localGet()

> **localGet**(`key`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`string` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:147](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/helpers/dom-helpers.ts#L147)

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
