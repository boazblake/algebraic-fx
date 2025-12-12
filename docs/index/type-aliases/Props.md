[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Props

# Type Alias: Props

> **Props** = `Record`\<`string`, `any`\> & `object`

Defined in: [core/types.ts:38](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/core/types.ts#L38)

Virtual DOM property bag.

These include HTML/SVG attributes, event listeners, and lifecycle hooks.

## Type Declaration

### oncreate()?

> `optional` **oncreate**: (`el`) => `void`

Called once when the element is created.

#### Parameters

##### el

`Element`

#### Returns

`void`

### onremove()?

> `optional` **onremove**: (`el`) => `void`

Called before the element is removed from the DOM.

#### Parameters

##### el

`Element`

#### Returns

`void`

### onupdate()?

> `optional` **onupdate**: (`el`, `oldProps`) => `void`

Called on each patch whenever props change.

#### Parameters

##### el

`Element`

the DOM element

##### oldProps

`Props`

previous props before the update

#### Returns

`void`
