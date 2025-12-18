[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Maybe](../README.md) / Just

# Interface: Just\<A\>

Defined in: [adt/maybe.ts:13](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/maybe.ts#L13)

## Extends

- `FLMethods`\<`A`\>

## Type Parameters

### A

`A`

## Indexable

\[`key`: `number`\]: \<`B`\>(`b`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\> \| \<`B`\>(`f`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\> \| \<`B`\>(`f`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\> \| \<`B`\>(`mf`) => [`Maybe`](../type-aliases/Maybe.md)\<`B`\>

## Properties

### \_tag

> `readonly` **\_tag**: `"Just"`

Defined in: [adt/maybe.ts:14](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/maybe.ts#L14)

***

### value

> `readonly` **value**: `A`

Defined in: [adt/maybe.ts:15](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/maybe.ts#L15)
