[**algebraic-fx v0.0.1**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / getOrElse

# Function: getOrElse()

> **getOrElse**\<`E`, `A`\>(`defaultValue`): (`t`) => `Promise`\<`A`\>

Defined in: [adt/task.ts:227](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L227)

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
