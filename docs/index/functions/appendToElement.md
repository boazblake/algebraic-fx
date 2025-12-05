[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / appendToElement

# Function: appendToElement()

> **appendToElement**(`selector`, `html`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:65](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/helpers/dom-helpers.ts#L65)

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
