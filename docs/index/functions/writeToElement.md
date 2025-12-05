[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / writeToElement

# Function: writeToElement()

> **writeToElement**(`selector`, `html`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:48](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/helpers/dom-helpers.ts#L48)

Replace the innerHTML of the element matched by the CSS selector.

This returns a `Reader<DomEnv, IO<HTMLElement | null>>`:
- When executed inside the environment, it locates the element,
- Sets `innerHTML`,
- Returns the element or null if not found.

## Parameters

### selector

`string`

CSS selector to find the element.

### html

`string`

HTML string to insert.

## Returns

[`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

## Example

```ts
runDomIO(writeToElement("#title", "<h1>Hello</h1>"), env);
```
