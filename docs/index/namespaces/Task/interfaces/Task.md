[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / Task

# Interface: Task\<E, A\>

Defined in: [adt/task.ts:11](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/task.ts#L11)

Task<E, A> represents an async computation that can fail with E or succeed with A.
It always resolves to Either<E, A>.

## Type Parameters

### E

`E`

### A

`A`

## Properties

### \_tag

> `readonly` **\_tag**: `"Task"`

Defined in: [adt/task.ts:12](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/task.ts#L12)

***

### \[fl\_ap\]()

> `readonly` **\[fl\_ap\]**: \<`B`\>(`fab`) => `Task`\<`E`, `B`\>

Defined in: [adt/task.ts:22](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/task.ts#L22)

#### Type Parameters

##### B

`B`

#### Parameters

##### fab

`Task`\<`E`, (`a`) => `B`\>

#### Returns

`Task`\<`E`, `B`\>

***

### \[fl\_chain\]()

> `readonly` **\[fl\_chain\]**: \<`B`\>(`f`) => `Task`\<`E`, `B`\>

Defined in: [adt/task.ts:21](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/task.ts#L21)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Task`\<`E`, `B`\>

#### Returns

`Task`\<`E`, `B`\>

***

### \[fl\_map\]()

> `readonly` **\[fl\_map\]**: \<`B`\>(`f`) => `Task`\<`E`, `B`\>

Defined in: [adt/task.ts:20](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/task.ts#L20)

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Task`\<`E`, `B`\>

***

### run()

> `readonly` **run**: () => `Promise`\<[`Either`](../../Either/type-aliases/Either.md)\<`E`, `A`\>\>

Defined in: [adt/task.ts:13](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/task.ts#L13)

#### Returns

`Promise`\<[`Either`](../../Either/type-aliases/Either.md)\<`E`, `A`\>\>

***

### runWith()

> `readonly` **runWith**: \<`R`\>(`onError`, `onSuccess`) => `Promise`\<`R`\>

Defined in: [adt/task.ts:14](https://github.com/boazblake/algebraic-fx/blob/96ac42bffe971bb25eb7eeea668977cd2b16bacd/src/adt/task.ts#L14)

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
