[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / traverse

# Function: traverse()

> **traverse**\<`A`, `B`\>(`f`): (`arr`) => [`IO`](../../../type-aliases/IO.md)\<`B`[]\>

Defined in: [adt/io.ts:106](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/io.ts#L106)

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
