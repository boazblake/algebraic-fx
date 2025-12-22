[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Props

# Type Alias: Props

> **Props** = `Record`\<`string`, `any`\> & `object`

Defined in: [core/types.ts:37](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/types.ts#L37)

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
