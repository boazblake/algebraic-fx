[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / m

# Function: m()

> **m**(`selector`, ...`rest`): [`Vnode`](../type-aliases/Vnode.md)

Defined in: [src/core/mithril-lite.ts:200](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/core/mithril-lite.ts#L200)

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
