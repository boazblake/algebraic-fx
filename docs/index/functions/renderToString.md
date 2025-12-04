[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / renderToString

# Function: renderToString()

> **renderToString**(`node`): `string`

Defined in: [src/core/render-to-string.ts:61](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/core/render-to-string.ts#L61)

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
