[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [WriterTask](../README.md) / makeWriterTask

# Function: makeWriterTask()

> **makeWriterTask**\<`W`, `E`, `A`\>(`runTask`, `m`): [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

Defined in: [adt/writer-task.ts:11](https://github.com/boazblake/algebraic-fx/blob/4887601557b375132fe7b7efada4cf0a15edcce2/src/adt/writer-task.ts#L11)

## Type Parameters

### W

`W`

### E

`E`

### A

`A`

## Parameters

### runTask

[`Task`](../../Task/interfaces/Task.md)\<`E`, \[`A`, `W`\]\>

### m

[`Monoid`](../../Monoid/type-aliases/Monoid.md)\<`W`\>

## Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>
