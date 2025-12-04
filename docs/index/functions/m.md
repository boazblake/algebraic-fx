[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / m

# Function: m()

> **m**(`selector`, ...`rest`): [`Vnode`](../type-aliases/Vnode.md)

Defined in: [src/core/mithril-lite.ts:200](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/core/mithril-lite.ts#L200)

Hyperscript function for building VNodes.

Syntax:
 - m("div", "text")
 - m("div#id.class1.class2", {...attrs}, children...)
 - m("svg", {...attrs}, [...children])

Selector grammar:
 - tag (div)
 - #id (#main)
 - .class (.container)
 - combined (div#header.title.highlight)

Keys:
 - pass { key: string } inside attrs to enable keyed diffing

## Parameters

### selector

`string`

### rest

...`any`[]

## Returns

[`Vnode`](../type-aliases/Vnode.md)

VNode
