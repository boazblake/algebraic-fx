[**algebraic-fx v1.0.0**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / getOrElse

# Function: getOrElse()

> **getOrElse**\<`E`, `A`\>(`defaultValue`): (`t`) => `Promise`\<`A`\>

Defined in: [src/adt/task.ts:217](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L217)

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
