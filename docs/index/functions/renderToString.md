[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderToString

# Function: renderToString()

> **renderToString**(`node`): `string`

Defined in: [core/render-to-string.ts:72](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/core/render-to-string.ts#L72)

Convert a vnode tree into an HTML string.

CORRECTED: Now works with mithril-lite.ts Vnode structure using 'attrs' instead of 'props'.

## Parameters

### node

`unknown`

A vnode, array, string, number, or null

## Returns

`string`

Escaped HTML string

Text is escaped via escapeText.
Attributes are escaped via escapeAttr.

## Example

```ts
renderToString(m("div", "Hello")) === "<div>Hello</div>"
renderToString(m("div", { class: "test" }, "Hi")) === '<div class="test">Hi</div>'
```
