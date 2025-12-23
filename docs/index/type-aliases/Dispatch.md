[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Dispatch

# Type Alias: Dispatch()\<Msg\>

> **Dispatch**\<`Msg`\> = (`msg`) => `void`

Defined in: [core/types.ts:73](https://github.com/boazblake/algebraic-fx/blob/bb776b25d1b0bcd63f947025b0a8c5be3c93c621/src/core/types.ts#L73)

Dispatch function used to send messages into the runtime.

Calling dispatch schedules a state transition via Program.update.

## Type Parameters

### Msg

`Msg`

## Parameters

### msg

`Msg`

## Returns

`void`
