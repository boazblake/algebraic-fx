[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [WriterTask](../README.md) / liftTask

# Function: liftTask()

> **liftTask**\<`W`, `E`, `A`\>(`m`, `t`): [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

Defined in: [adt/writer-task.ts:75](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/adt/writer-task.ts#L75)

## Type Parameters

### W

`W`

### E

`E`

### A

`A`

## Parameters

### m

[`Monoid`](../../Monoid/type-aliases/Monoid.md)\<`W`\>

### t

[`Task`](../../Task/interfaces/Task.md)\<`E`, `A`\>

## Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>
