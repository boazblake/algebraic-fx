[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Dispatch

# Type Alias: Dispatch()\<Msg\>

> **Dispatch**\<`Msg`\> = (`msg`) => `void`

Defined in: [core/types.ts:72](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/core/types.ts#L72)

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
