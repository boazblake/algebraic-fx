[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Dispatch

# Type Alias: Dispatch()\<Msg\>

> **Dispatch**\<`Msg`\> = (`msg`) => `void`

Defined in: [core/types.ts:73](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/core/types.ts#L73)

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
