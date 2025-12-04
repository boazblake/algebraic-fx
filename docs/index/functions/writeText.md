[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / writeText

# Function: writeText()

> **writeText**(`selector`, `text`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:80](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/dom-helpers.ts#L80)

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
