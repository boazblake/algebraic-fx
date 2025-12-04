[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / traverse

# Function: traverse()

> **traverse**\<`A`, `B`\>(`f`): (`arr`) => [`IO`](../../../type-aliases/IO.md)\<`B`[]\>

Defined in: [src/adt/io.ts:106](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/io.ts#L106)

Traverse an array using a function returning IO.
Equivalent to: IO.sequence(arr.map(f))

## Type Parameters

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`IO`](../../../type-aliases/IO.md)\<`B`\>

## Returns

> (`arr`): [`IO`](../../../type-aliases/IO.md)\<`B`[]\>

### Parameters

#### arr

`A`[]

### Returns

[`IO`](../../../type-aliases/IO.md)\<`B`[]\>
