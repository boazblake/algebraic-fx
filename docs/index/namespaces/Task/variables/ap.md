[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / ap

# Variable: ap()

> `const` **ap**: \<`E`, `A`, `B`\>(`tf`) => (`tv`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\> = `TaskModule.ap`

Defined in: [adt/task.ts:179](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/task.ts#L179)

Applicative ap:
  ap(tf)(tv) ≡ tv.ap(tf)
where tf: Task<E, (a: A) => B>, tv: Task<E, A>.

## Type Parameters

### E

`E`

### A

`A`

### B

`B`

## Parameters

### tf

[`Task`](../interfaces/Task.md)\<`E`, (`a`) => `B`\>

## Returns

> (`tv`): [`Task`](../interfaces/Task.md)\<`E`, `B`\>

### Parameters

#### tv

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

### Returns

[`Task`](../interfaces/Task.md)\<`E`, `B`\>
