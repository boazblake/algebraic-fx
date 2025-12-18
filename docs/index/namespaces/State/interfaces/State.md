[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [State](../README.md) / State

# Interface: State\<S, A\>

Defined in: [adt/state.ts:3](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/state.ts#L3)

## Type Parameters

### S

`S`

### A

`A`

## Indexable

\[`key`: `number`\]: \<`B`\>(`f`) => `State`\<`S`, `B`\> \| \<`B`\>(`f`) => `State`\<`S`, `B`\> \| \<`B`\>(`sf`) => `State`\<`S`, `B`\>

## Properties

### \_tag

> `readonly` **\_tag**: `"State"`

Defined in: [adt/state.ts:4](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/state.ts#L4)

***

### run()

> `readonly` **run**: (`s`) => \[`A`, `S`\]

Defined in: [adt/state.ts:5](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/state.ts#L5)

#### Parameters

##### s

`S`

#### Returns

\[`A`, `S`\]
