[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [WriterTask](../README.md) / chain

# Function: chain()

> **chain**\<`W`, `E`, `A`, `B`\>(`wa`, `f`): [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

Defined in: [adt/writer-task.ts:42](https://github.com/boazblake/algebraic-fx/blob/d0bbbb937347c32e45bf55a848f87f5b870532c7/src/adt/writer-task.ts#L42)

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
