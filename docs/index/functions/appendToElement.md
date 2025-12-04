[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / appendToElement

# Function: appendToElement()

> **appendToElement**(`selector`, `html`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:65](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/dom-helpers.ts#L65)

Append HTML to the selected element using `insertAdjacentHTML("beforeend")`.

Useful for declarative DOM updates through the effect system.

## Parameters

### selector

`string`

CSS selector to find the element.

### html

`string`

HTML string to append.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

## Example

```ts
runDomIO(appendToElement("#list", "<li>Item</li>"), env);
```
