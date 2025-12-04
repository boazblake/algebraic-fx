[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / writeText

# Function: writeText()

> **writeText**(`selector`, `text`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:80](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/helpers/dom-helpers.ts#L80)

Set `textContent` on the selected element.

## Parameters

### selector

`string`

CSS selector of the target element.

### text

`string`

Text content to apply.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

## Example

```ts
runDomIO(writeText("#status", "Ready"), env);
```
