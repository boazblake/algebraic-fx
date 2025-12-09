[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Stream](../README.md) / fromEvent

# Function: fromEvent()

> **fromEvent**\<`E`\>(`target`, `eventName`): [`Stream`](../../../type-aliases/Stream.md)\<`E`\>

Defined in: [adt/stream.ts:291](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L291)

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
