[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Reader](../README.md) / traverse

# Function: traverse()

> **traverse**\<`E`, `A`, `B`\>(`f`): (`arr`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`[]\>

Defined in: [adt/reader.ts:152](https://github.com/boazblake/algebraic-fx/blob/15fc23e58389a849d2c125ac9db8580b17172ce1/src/adt/reader.ts#L152)

Traverse an array using a Reader-producing function.

Equivalent to: `Reader.sequence(arr.map(f))`.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### f

(`a`) => [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`\>

## Returns

> (`arr`): [`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`[]\>

### Parameters

#### arr

`A`[]

### Returns

[`Reader`](../../../type-aliases/Reader.md)\<`E`, `B`[]\>
