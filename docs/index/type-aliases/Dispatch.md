[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Dispatch

# Type Alias: Dispatch()\<Msg\>

> **Dispatch**\<`Msg`\> = (`msg`) => `void`

Defined in: [core/types.ts:73](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/core/types.ts#L73)

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
