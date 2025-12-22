[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Either](../README.md) / ap

# Function: ap()

> **ap**\<`E`, `A`, `B`\>(`fab`, `fa`): [`Either`](../type-aliases/Either.md)\<`E`, `B`\>

Defined in: [adt/either.ts:76](https://github.com/boazblake/algebraic-fx/blob/ae62c782888b279636452a51955670e5a37cc7d2/src/adt/either.ts#L76)

Apply. If either side is Left, it short circuits.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### fab

[`Either`](../type-aliases/Either.md)\<`E`, (`a`) => `B`\>

### fa

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

## Returns

[`Either`](../type-aliases/Either.md)\<`E`, `B`\>
