[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Task

# Type Alias: Task\<E, A\>

> **Task**\<`E`, `A`\> = `object`

Defined in: [adt/task.ts:24](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L24)

Lazy asynchronous computation that:

- may fail with `E` or succeed with `A`
- does not execute until `.run()` or `.runWith(signal)` is called
- supports cancellation via AbortSignal
- supports mapping, chaining, bimap, mapError, applicative ap

Task semantics:
- `run()` executes without cancellation
- `runWith(signal)` executes with cancellation support

## Type Parameters

### E

`E`

Error type

### A

`A`

Result type

## Properties

### \[TaskBrand\]

> `readonly` **\[TaskBrand\]**: `true`

Defined in: [adt/task.ts:25](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L25)

***

### ap()

> **ap**: \<`B`\>(`fb`) => `Task`\<`E`, `B`\>

Defined in: [adt/task.ts:43](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L43)

Applicative apply.

#### Type Parameters

##### B

`B`

#### Parameters

##### fb

`Task`\<`E`, (`a`) => `B`\>

#### Returns

`Task`\<`E`, `B`\>

***

### bimap()

> **bimap**: \<`E2`, `B`\>(`onError`, `onSuccess`) => `Task`\<`E2`, `B`\>

Defined in: [adt/task.ts:49](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L49)

Map error OR value depending on outcome.

#### Type Parameters

##### E2

`E2`

##### B

`B`

#### Parameters

##### onError

(`e`) => `E2`

##### onSuccess

(`a`) => `B`

#### Returns

`Task`\<`E2`, `B`\>

***

### chain()

> **chain**: \<`B`\>(`f`) => `Task`\<`E`, `B`\>

Defined in: [adt/task.ts:40](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L40)

Chain another Task-producing function.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Task`\<`E`, `B`\>

#### Returns

`Task`\<`E`, `B`\>

***

### map()

> **map**: \<`B`\>(`f`) => `Task`\<`E`, `B`\>

Defined in: [adt/task.ts:37](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L37)

Transform the result value on success.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Task`\<`E`, `B`\>

***

### mapError()

> **mapError**: \<`E2`\>(`f`) => `Task`\<`E2`, `A`\>

Defined in: [adt/task.ts:46](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L46)

Map the error side only.

#### Type Parameters

##### E2

`E2`

#### Parameters

##### f

(`e`) => `E2`

#### Returns

`Task`\<`E2`, `A`\>

***

### run()

> **run**: () => `Promise`\<[`Either`](Either.md)\<`E`, `A`\>\>

Defined in: [adt/task.ts:28](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L28)

Start the async computation with no AbortSignal.

#### Returns

`Promise`\<[`Either`](Either.md)\<`E`, `A`\>\>

***

### runWith()

> **runWith**: (`signal`) => `Promise`\<[`Either`](Either.md)\<`E`, `A`\>\>

Defined in: [adt/task.ts:34](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/task.ts#L34)

Start the async computation with cancellation support.
Throws if no AbortSignal is provided.

#### Parameters

##### signal

`AbortSignal`

#### Returns

`Promise`\<[`Either`](Either.md)\<`E`, `A`\>\>
