[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / m

# Function: m()

> **m**(`selector`, ...`rest`): [`Vnode`](../type-aliases/Vnode.md)

Defined in: [core/mithril-lite.ts:220](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/mithril-lite.ts#L220)

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
