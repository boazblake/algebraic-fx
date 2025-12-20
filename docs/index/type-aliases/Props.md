[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Props

# Type Alias: Props

> **Props** = `Record`\<`string`, `any`\> & `object`

Defined in: [core/types.ts:36](https://github.com/boazblake/algebraic-fx/blob/eef3be67e120439e0d5ff83f9f2b060e0fd2dc15/src/core/types.ts#L36)

Element attributes and properties.

Special lifecycle hooks are optional and renderer-specific.

## Type Declaration

### oncreate()?

> `optional` **oncreate**: (`el`) => `void`

#### Parameters

##### el

`Element`

#### Returns

`void`

### onremove()?

> `optional` **onremove**: (`el`) => `void`

#### Parameters

##### el

`Element`

#### Returns

`void`

### onupdate()?

> `optional` **onupdate**: (`el`, `oldProps`) => `void`

#### Parameters

##### el

`Element`

##### oldProps

`Props`

#### Returns

`void`
