[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [IO](../README.md) / IO

# Interface: IO\<A\>

Defined in: [adt/io.ts:4](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/io.ts#L4)

## Type Parameters

### A

`A`

## Indexable

\[`key`: `number`\]: \<`B`\>(`f`) => `IO`\<`B`\> \| \<`B`\>(`f`) => `IO`\<`B`\> \| \<`B`\>(`fa`) => `IO`\<`B`\>

## Properties

### \_tag

> `readonly` **\_tag**: `"IO"`

Defined in: [adt/io.ts:5](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/io.ts#L5)

***

### run()

> `readonly` **run**: () => `A`

Defined in: [adt/io.ts:6](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/io.ts#L6)

#### Returns

`A`
