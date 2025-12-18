[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / Task

# Interface: Task\<E, A\>

Defined in: [adt/task.ts:11](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/task.ts#L11)

Task<E, A> represents an async computation that can fail with E or succeed with A.
It always resolves to Either<E, A>.

## Type Parameters

### E

`E`

### A

`A`

## Indexable

\[`key`: `number`\]: \<`B`\>(`f`) => `Task`\<`E`, `B`\> \| \<`B`\>(`f`) => `Task`\<`E`, `B`\> \| \<`B`\>(`fab`) => `Task`\<`E`, `B`\>

## Properties

### \_tag

> `readonly` **\_tag**: `"Task"`

Defined in: [adt/task.ts:12](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/task.ts#L12)

***

### run()

> `readonly` **run**: () => `Promise`\<[`Either`](../../Either/type-aliases/Either.md)\<`E`, `A`\>\>

Defined in: [adt/task.ts:13](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/task.ts#L13)

#### Returns

`Promise`\<[`Either`](../../Either/type-aliases/Either.md)\<`E`, `A`\>\>

***

### runWith()

> `readonly` **runWith**: \<`R`\>(`onError`, `onSuccess`) => `Promise`\<`R`\>

Defined in: [adt/task.ts:14](https://github.com/boazblake/algebraic-fx/blob/45e14646ac8599aefff6cd371096e5d1cc186922/src/adt/task.ts#L14)

#### Type Parameters

##### R

`R`

#### Parameters

##### onError

(`e`) => `R` \| `Promise`\<`R`\>

##### onSuccess

(`a`) => `R` \| `Promise`\<`R`\>

#### Returns

`Promise`\<`R`\>
