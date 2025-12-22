[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [WriterTask](../README.md) / WriterTaskModule

# Function: WriterTaskModule()

> **WriterTaskModule**\<`W`\>(`m`): `object`

Defined in: [adt/writer-task.ts:91](https://github.com/boazblake/algebraic-fx/blob/a47c3d37eb78ea4c5c1854738db0836b7a8577e1/src/adt/writer-task.ts#L91)

## Type Parameters

### W

`W`

## Parameters

### m

[`Monoid`](../../Monoid/type-aliases/Monoid.md)\<`W`\>

## Returns

`object`

### ap()

> **ap**: \<`E`, `A`, `B`\>(`wf`, `wa`) => [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### wf

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, (`a`) => `B`\>

##### wa

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

#### Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

### chain()

> **chain**: \<`E`, `A`, `B`\>(`wa`, `f`) => [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### wa

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

##### f

(`a`) => [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

#### Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

### isWriterTask()

> **isWriterTask**: (`u`) => `u is WriterTask<unknown, unknown, unknown>`

#### Parameters

##### u

`unknown`

#### Returns

`u is WriterTask<unknown, unknown, unknown>`

### liftTask()

> **liftTask**: \<`E`, `A`\>(`t`) => [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### t

[`Task`](../../Task/interfaces/Task.md)\<`E`, `A`\>

#### Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

### map()

> **map**: \<`E`, `A`, `B`\>(`wa`, `f`) => [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### wa

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

##### f

(`a`) => `B`

#### Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `B`\>

### of()

> **of**: \<`E`, `A`\>(`a`, `w?`) => [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### a

`A`

##### w?

`W`

#### Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `A`\>

### tell()

> **tell**: \<`E`\>(`w`) => [`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `void`\>

#### Type Parameters

##### E

`E`

#### Parameters

##### w

`W`

#### Returns

[`WriterTask`](../type-aliases/WriterTask.md)\<`W`, `E`, `void`\>
