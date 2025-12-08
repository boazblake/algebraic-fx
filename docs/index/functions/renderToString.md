[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderToString

# Function: renderToString()

> **renderToString**(`node`): `string`

Defined in: [core/render-to-string.ts:61](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/render-to-string.ts#L61)

Convert a vnode tree into an HTML string.

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
```
