[**algebraic-fx v0.0.2**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Dispatch

# Type Alias: Dispatch()\<Msg\>

> **Dispatch**\<`Msg`\> = (`msg`) => `void`

Defined in: [core/types.ts:72](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/core/types.ts#L72)

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
