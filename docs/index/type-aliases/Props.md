[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Props

# Type Alias: Props

> **Props** = `Record`\<`string`, `any`\> & `object`

Defined in: [core/types.ts:35](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/core/types.ts#L35)

Attributes and event handlers for VNode props.

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
