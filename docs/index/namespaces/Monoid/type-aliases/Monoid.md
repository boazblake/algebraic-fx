[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Monoid](../README.md) / Monoid

# Type Alias: Monoid\<A\>

> **Monoid**\<`A`\> = `object`

Defined in: [adt/monoid.ts:4](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/monoid.ts#L4)

## Type Parameters

### A

`A`

## Indexable

\[`key`: `number`\]: `A` \| (`x`, `y`) => `A` \| `undefined`

## Properties

### concat()

> `readonly` **concat**: (`x`, `y`) => `A`

Defined in: [adt/monoid.ts:6](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/monoid.ts#L6)

#### Parameters

##### x

`A`

##### y

`A`

#### Returns

`A`

***

### empty

> `readonly` **empty**: `A`

Defined in: [adt/monoid.ts:5](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/monoid.ts#L5)
