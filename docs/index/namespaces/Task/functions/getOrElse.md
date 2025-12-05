[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / getOrElse

# Function: getOrElse()

> **getOrElse**\<`E`, `A`\>(`defaultValue`): (`t`) => `Promise`\<`A`\>

Defined in: [src/adt/task.ts:217](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/adt/task.ts#L217)

Extract the success value with a default fallback.

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### defaultValue

`A`

## Returns

> (`t`): `Promise`\<`A`\>

### Parameters

#### t

[`Task`](../../../type-aliases/Task.md)\<`E`, `A`\>

### Returns

`Promise`\<`A`\>
