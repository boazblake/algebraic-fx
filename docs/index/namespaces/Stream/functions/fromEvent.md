[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / fromEvent

# Function: fromEvent()

> **fromEvent**\<`E`\>(`target`, `eventName`): [`Stream`](../../../type-aliases/Stream.md)\<`E`\>

Defined in: [src/adt/stream.ts:292](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L292)

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
