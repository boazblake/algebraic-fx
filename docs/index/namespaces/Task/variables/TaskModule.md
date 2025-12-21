[**algebraic-fx v0.0.2**](../../../../README.md)

***

[algebraic-fx](../../../../README.md) / [index](../../../README.md) / [Task](../README.md) / TaskModule

# Variable: TaskModule

> `const` **TaskModule**: `object`

Defined in: [adt/task.ts:83](https://github.com/boazblake/algebraic-fx/blob/3bf06f7d7432389994fdd86192463b0719469de6/src/adt/task.ts#L83)

## Type Declaration

### \[fl\_ap\]()

> `readonly` **\[fl\_ap\]**(`tf`): (`tv`) => [`Task`](../interfaces/Task.md)\<`any`, `any`\>

#### Parameters

##### tf

[`Task`](../interfaces/Task.md)\<`any`, (`a`) => `any`\>

#### Returns

> (`tv`): [`Task`](../interfaces/Task.md)\<`any`, `any`\>

##### Parameters

###### tv

[`Task`](../interfaces/Task.md)\<`any`, `any`\>

##### Returns

[`Task`](../interfaces/Task.md)\<`any`, `any`\>

### \[fl\_chain\]()

> `readonly` **\[fl\_chain\]**(`f`): (`fa`) => [`Task`](../interfaces/Task.md)\<`any`, `any`\>

#### Parameters

##### f

(`a`) => [`Task`](../interfaces/Task.md)\<`any`, `any`\>

#### Returns

> (`fa`): [`Task`](../interfaces/Task.md)\<`any`, `any`\>

##### Parameters

###### fa

[`Task`](../interfaces/Task.md)\<`any`, `any`\>

##### Returns

[`Task`](../interfaces/Task.md)\<`any`, `any`\>

### \[fl\_map\]()

> `readonly` **\[fl\_map\]**(`f`): (`fa`) => [`Task`](../interfaces/Task.md)\<`any`, `any`\>

#### Parameters

##### f

(`a`) => `any`

#### Returns

> (`fa`): [`Task`](../interfaces/Task.md)\<`any`, `any`\>

##### Parameters

###### fa

[`Task`](../interfaces/Task.md)\<`any`, `any`\>

##### Returns

[`Task`](../interfaces/Task.md)\<`any`, `any`\>

### \[fl\_of\]()

> `readonly` **\[fl\_of\]**\<`A`\>(`a`): [`Task`](../interfaces/Task.md)\<`never`, `A`\>

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Task`](../interfaces/Task.md)\<`never`, `A`\>

### ap()

> `readonly` **ap**\<`E`, `A`, `B`\>(`tf`): (`tv`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\>

Applicative ap:
  ap(tf)(tv) ≡ tv.ap(tf)
where tf: Task<E, (a: A) => B>, tv: Task<E, A>.

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### tf

[`Task`](../interfaces/Task.md)\<`E`, (`a`) => `B`\>

#### Returns

> (`tv`): [`Task`](../interfaces/Task.md)\<`E`, `B`\>

##### Parameters

###### tv

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../interfaces/Task.md)\<`E`, `B`\>

### chain()

> `readonly` **chain**\<`E`, `A`, `B`\>(`f`): (`fa`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\>

#### Type Parameters

##### E

`E`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\>

#### Returns

> (`fa`): [`Task`](../interfaces/Task.md)\<`E`, `B`\>

##### Parameters

###### fa

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../interfaces/Task.md)\<`E`, `B`\>

### fail()

> `readonly` **fail**\<`E`, `A`\>(`e`): [`Task`](../interfaces/Task.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `unknown`

##### A

`A` = `never`

#### Parameters

##### e

`E`

#### Returns

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

### fromEither()

> `readonly` **fromEither**\<`E`, `A`\>(`ea`): [`Task`](../interfaces/Task.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E`

##### A

`A`

#### Parameters

##### ea

[`Either`](../../Either/type-aliases/Either.md)\<`E`, `A`\>

#### Returns

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

### fromIO()

> `readonly` **fromIO**\<`E`, `A`\>(`io`): [`Task`](../interfaces/Task.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `never`

##### A

`A` = `never`

#### Parameters

##### io

[`IO`](../../IO/interfaces/IO.md)\<`A`\>

#### Returns

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

### fromPromise()

> `readonly` **fromPromise**\<`E`, `A`\>(`thunk`, `onError`): [`Task`](../interfaces/Task.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `unknown`

##### A

`A` = `unknown`

#### Parameters

##### thunk

() => `Promise`\<`A`\>

##### onError

(`e`) => `E`

#### Returns

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

### isTask()

> `readonly` **isTask**(`u`): `u is Task<unknown, unknown>`

#### Parameters

##### u

`unknown`

#### Returns

`u is Task<unknown, unknown>`

### map()

> `readonly` **map**\<`E`, `A`, `B`\>(`f`): (`fa`) => [`Task`](../interfaces/Task.md)\<`E`, `B`\>

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

> (`fa`): [`Task`](../interfaces/Task.md)\<`E`, `B`\>

##### Parameters

###### fa

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

##### Returns

[`Task`](../interfaces/Task.md)\<`E`, `B`\>

### of()

> `readonly` **of**\<`E`, `A`\>(`a`): [`Task`](../interfaces/Task.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `never`

##### A

`A` = `never`

#### Parameters

##### a

`A`

#### Returns

[`Task`](../interfaces/Task.md)\<`E`, `A`\>

### tryCatch()

> `readonly` **tryCatch**\<`E`, `A`\>(`thunk`, `onError`): [`Task`](../interfaces/Task.md)\<`E`, `A`\>

#### Type Parameters

##### E

`E` = `unknown`

##### A

`A` = `unknown`

#### Parameters

##### thunk

() => `A`

##### onError

(`e`) => `E`

#### Returns

[`Task`](../interfaces/Task.md)\<`E`, `A`\>
