[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [WriterTask](../README.md) / chain

# Function: chain()

> **chain**\<`W`, `E`, `A`, `B`\>(`wa`, `f`): [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

Defined in: [adt/writer-task.ts:42](https://github.com/boazblake/algebraic-fx/blob/0d629bd1fda6e2e1d0cce3c441beba4f01ce08b8/src/adt/writer-task.ts#L42)

## Type Parameters

### W

`W`

### E

`E`

### A

`A`

### B

`B`

## Parameters

### wa

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

### f

(`a`) => [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

## Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>
