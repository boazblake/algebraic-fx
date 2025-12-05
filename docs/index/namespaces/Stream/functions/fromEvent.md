[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / fromEvent

# Function: fromEvent()

> **fromEvent**\<`E`\>(`target`, `eventName`): [`Stream`](../../../type-aliases/Stream.md)\<`E`\>

Defined in: [src/adt/stream.ts:292](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/stream.ts#L292)

Create a Stream from DOM events.

## Type Parameters

### E

`E` *extends* `Event`

## Parameters

### target

`EventTarget`

EventTarget to subscribe on

### eventName

`string`

Event name string

## Returns

[`Stream`](../../../type-aliases/Stream.md)\<`E`\>
