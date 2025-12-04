[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / writeToElement

# Function: writeToElement()

> **writeToElement**(`selector`, `html`): [`Reader`](../type-aliases/Reader.md)\<[`DomEnv`](../type-aliases/DomEnv.md), [`IO`](../type-aliases/IO.md)\<`HTMLElement` \| `null`\>\>

Defined in: [src/helpers/dom-helpers.ts:48](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/helpers/dom-helpers.ts#L48)

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
