[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [WriterTask](../README.md) / liftTask

# Function: liftTask()

> **liftTask**\<`W`, `E`, `A`\>(`m`, `t`): [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

Defined in: [adt/writer-task.ts:75](https://github.com/boazblake/algebraic-fx/blob/ae2b3a444c76c35d4d170caba72c8672abc39d40/src/adt/writer-task.ts#L75)

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
