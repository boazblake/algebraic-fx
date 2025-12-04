[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Task

# Variable: Task

> **Task**: \{\<`E`, `A`\>(`run0`): [`Task`](../type-aliases/Task.md)\<`E`, `A`\>; `all`: [`Task`](../type-aliases/Task.md)\<`E`, `A`[]\>; `ap`: (`fa`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`\>; `bimap`: (`t`) => [`Task`](../type-aliases/Task.md)\<`E2`, `B`\>; `chain`: (`t`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`\>; `delay`: \<`E`, `A`\>(`t`) => [`Task`](../type-aliases/Task.md)\<`E`, `A`\>; `fold`: (`t`) => `Promise`\<`B`\>; `fromEither`: [`Task`](../type-aliases/Task.md)\<`E`, `A`\>; `getOrElse`: (`t`) => `Promise`\<`A`\>; `map`: (`t`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`\>; `mapError`: \<`A`\>(`t`) => [`Task`](../type-aliases/Task.md)\<`E2`, `A`\>; `of`: [`Task`](../type-aliases/Task.md)\<`never`, `A`\>; `race`: [`Task`](../type-aliases/Task.md)\<`E`, `A`\>; `reject`: [`Task`](../type-aliases/Task.md)\<`E`, `never`\>; `sequence`: [`Task`](../type-aliases/Task.md)\<`E`, `A`[]\>; `timeout`: \<`A`\>(`t`) => [`Task`](../type-aliases/Task.md)\<`E`, `A`\>; `toPromise`: `Promise`\<`A`\>; `traverse`: (`arr`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`[]\>; `tryCatch`: [`Task`](../type-aliases/Task.md)\<`unknown`, `A`\>; `tryCatchK`: [`Task`](../type-aliases/Task.md)\<`E`, `A`\>; \}

Defined in: [src/adt/task.ts:24](https://github.com/boazblake/algebraic-fx/blob/72ec4b64caa6a6d4d7c07250727f11a44a289f6e/src/adt/task.ts#L24)

Construct a Task given a function that accepts an optional AbortSignal.

The returned Task is lazy and will not run until `.run()` or `.runWith(signal)` is called.

## Type Declaration

## Type Parameters

### E

`E`

### A

`A`

## Parameters

### run0

(`signal?`) => `Promise`\<[`Either`](../type-aliases/Either.md)\<`E`, `A`\>\>

Underlying async function returning `Either<E, A>`

## Returns

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

### all()

> **all**\<`E`, `A`\>(`tasks`): [`Task`](../type-aliases/Task.md)\<`E`, `A`[]\>

Run all Tasks in parallel.
Fails fast if any task fails.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### tasks

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>[]

#### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `A`[]\>

### ap()

> **ap**\<`E`, `A`, `B`\>(`fb`): (`fa`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`\>

Point-free ap.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### fb

[`Task`](../type-aliases/Task.md)\<`E`, (`a`) => `B`\>

#### Returns

> (`fa`): [`Task`](../type-aliases/Task.md)\<`E`, `B`\>

##### Parameters

###### fa

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `B`\>

### bimap()

> **bimap**\<`E`, `E2`, `A`, `B`\>(`onError`, `onSuccess`): (`t`) => [`Task`](../type-aliases/Task.md)\<`E2`, `B`\>

Point-free bimap.

#### Type Parameters

##### E

`E`

##### E2

`E2`

##### A

`A`

##### B

`B`

#### Parameters

##### onError

(`e`) => `E2`

##### onSuccess

(`a`) => `B`

#### Returns

> (`t`): [`Task`](../type-aliases/Task.md)\<`E2`, `B`\>

##### Parameters

###### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../type-aliases/Task.md)\<`E2`, `B`\>

### chain()

> **chain**\<`E`, `A`, `B`\>(`f`): (`t`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`\>

Point-free chain.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`\>

#### Returns

> (`t`): [`Task`](../type-aliases/Task.md)\<`E`, `B`\>

##### Parameters

###### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `B`\>

### delay()

> **delay**(`ms`): \<`E`, `A`\>(`t`) => [`Task`](../type-aliases/Task.md)\<`E`, `A`\>

Delay a Task’s execution by N milliseconds (abort-aware).

#### Parameters

##### ms

`number`

#### Returns

> \<`E`, `A`\>(`t`): [`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Type Parameters

###### E

`E`

###### A

`A`

##### Parameters

###### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

### fold()

> **fold**\<`E`, `A`, `B`\>(`onError`, `onSuccess`): (`t`) => `Promise`\<`B`\>

Consume a Task by converting its Either result into the final pure value.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### onError

(`e`) => `B`

##### onSuccess

(`a`) => `B`

#### Returns

> (`t`): `Promise`\<`B`\>

##### Parameters

###### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

`Promise`\<`B`\>

### fromEither()

> **fromEither**\<`E`, `A`\>(`e`): [`Task`](../type-aliases/Task.md)\<`E`, `A`\>

Lift an Either into a Task.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### e

[`Either`](../type-aliases/Either.md)\<`E`, `A`\>

#### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

### getOrElse()

> **getOrElse**\<`E`, `A`\>(`defaultValue`): (`t`) => `Promise`\<`A`\>

Extract the success value with a default fallback.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### defaultValue

`A`

#### Returns

> (`t`): `Promise`\<`A`\>

##### Parameters

###### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

`Promise`\<`A`\>

### map()

> **map**\<`E`, `A`, `B`\>(`f`): (`t`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`\>

Point-free map.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> (`t`): [`Task`](../type-aliases/Task.md)\<`E`, `B`\>

##### Parameters

###### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `B`\>

### mapError()

> **mapError**\<`E`, `E2`\>(`f`): \<`A`\>(`t`) => [`Task`](../type-aliases/Task.md)\<`E2`, `A`\>

Point-free mapError.

#### Type Parameters

##### E

`E`

##### E2

`E2`

#### Parameters

##### f

(`e`) => `E2`

#### Returns

> \<`A`\>(`t`): [`Task`](../type-aliases/Task.md)\<`E2`, `A`\>

##### Type Parameters

###### A

`A`

##### Parameters

###### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../type-aliases/Task.md)\<`E2`, `A`\>

### of()

> **of**\<`A`\>(`a`): [`Task`](../type-aliases/Task.md)\<`never`, `A`\>

Lift a value into a successful Task.

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Task`](../type-aliases/Task.md)\<`never`, `A`\>

### race()

> **race**\<`E`, `A`\>(`tasks`): [`Task`](../type-aliases/Task.md)\<`E`, `A`\>

Race multiple Tasks, resolving with the first to finish.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### tasks

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>[]

#### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

### reject()

> **reject**\<`E`\>(`e`): [`Task`](../type-aliases/Task.md)\<`E`, `never`\>

Construct a failing Task.

#### Type Parameters

##### E

`E`

#### Parameters

##### e

`E`

#### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `never`\>

### sequence()

> **sequence**\<`E`, `A`\>(`tasks`): [`Task`](../type-aliases/Task.md)\<`E`, `A`[]\>

Execute Tasks sequentially, short-circuiting on Failure.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### tasks

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>[]

#### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `A`[]\>

### timeout()

> **timeout**\<`E`\>(`ms`, `onTimeout`): \<`A`\>(`t`) => [`Task`](../type-aliases/Task.md)\<`E`, `A`\>

Timeout a Task after N ms, returning a Left(onTimeout).

#### Type Parameters

##### E

`E`

#### Parameters

##### ms

`number`

##### onTimeout

`E`

#### Returns

> \<`A`\>(`t`): [`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Type Parameters

###### A

`A`

##### Parameters

###### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

### toPromise()

> **toPromise**\<`E`, `A`\>(`t`): `Promise`\<`A`\>

Convert a Task into a Promise that throws on Left.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### t

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>

#### Returns

`Promise`\<`A`\>

### traverse()

> **traverse**\<`E`, `A`, `B`\>(`f`): (`arr`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`[]\>

Traverse an array by mapping each element to a Task and sequencing.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Task`](../type-aliases/Task.md)\<`E`, `B`\>

#### Returns

> (`arr`): [`Task`](../type-aliases/Task.md)\<`E`, `B`[]\>

##### Parameters

###### arr

`A`[]

##### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `B`[]\>

### tryCatch()

> **tryCatch**\<`A`\>(`f`): [`Task`](../type-aliases/Task.md)\<`unknown`, `A`\>

Wrap a Promise-returning function into a Task that catches errors.

#### Type Parameters

##### A

`A`

#### Parameters

##### f

() => `Promise`\<`A`\>

#### Returns

[`Task`](../type-aliases/Task.md)\<`unknown`, `A`\>

### tryCatchK()

> **tryCatchK**\<`E`, `A`\>(`f`, `onError`): [`Task`](../type-aliases/Task.md)\<`E`, `A`\>

tryCatch with custom error mapping.

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### f

() => `Promise`\<`A`\>

##### onError

(`e`) => `E`

#### Returns

[`Task`](../type-aliases/Task.md)\<`E`, `A`\>
