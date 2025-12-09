[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Stream

# Variable: Stream

> **Stream**: \{\<`A`\>(`subscribe`): [`Stream`](../type-aliases/Stream.md)\<`A`\>; `combineLatest`: [`Stream`](../type-aliases/Stream.md)\<\[`A`, `B`\]\>; `concat`: [`Stream`](../type-aliases/Stream.md)\<`A`\>; `debounce`: (`s`) => [`Stream`](../type-aliases/Stream.md)\<`A`\>; `distinctUntilChanged`: (`s`) => [`Stream`](../type-aliases/Stream.md)\<`A`\>; `empty`: [`Stream`](../type-aliases/Stream.md)\<`A`\>; `fromArray`: [`Stream`](../type-aliases/Stream.md)\<`A`\>; `fromEvent`: [`Stream`](../type-aliases/Stream.md)\<`E`\>; `fromPromise`: [`Stream`](../type-aliases/Stream.md)\<`A`\>; `interval`: [`Stream`](../type-aliases/Stream.md)\<`number`\>; `merge`: [`Stream`](../type-aliases/Stream.md)\<`A`\>; `never`: [`Stream`](../type-aliases/Stream.md)\<`A`\>; `of`: [`Stream`](../type-aliases/Stream.md)\<`A`\>; `periodic`: [`Stream`](../type-aliases/Stream.md)\<`void`\>; `throttle`: (`s`) => [`Stream`](../type-aliases/Stream.md)\<`A`\>; `zip`: [`Stream`](../type-aliases/Stream.md)\<\[`A`, `B`\]\>; \}

Defined in: [adt/stream.ts:41](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L41)

Stream constructor.

All stream combinators ultimately call this function to build new streams.

## Type Declaration

## Type Parameters

### A

`A`

## Parameters

### subscribe

(`o`) => `Unsubscribe`

Function describing how to produce values for an observer

## Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### combineLatest()

> **combineLatest**\<`A`, `B`\>(`sa`, `sb`): [`Stream`](../type-aliases/Stream.md)\<\[`A`, `B`\]\>

Combine latest values from two streams.
Emits whenever either stream updates, but only after both have emitted at least once.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### sa

[`Stream`](../type-aliases/Stream.md)\<`A`\>

##### sb

[`Stream`](../type-aliases/Stream.md)\<`B`\>

#### Returns

[`Stream`](../type-aliases/Stream.md)\<\[`A`, `B`\]\>

### concat()

> **concat**\<`A`\>(`s1`, `s2`): [`Stream`](../type-aliases/Stream.md)\<`A`\>

Concatenate two streams:
- consume s1 fully
- then subscribe to s2

#### Type Parameters

##### A

`A`

#### Parameters

##### s1

[`Stream`](../type-aliases/Stream.md)\<`A`\>

##### s2

[`Stream`](../type-aliases/Stream.md)\<`A`\>

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### debounce()

> **debounce**\<`A`\>(`ms`): (`s`) => [`Stream`](../type-aliases/Stream.md)\<`A`\>

Debounce a stream: wait `ms` milliseconds after each event before emitting.

#### Type Parameters

##### A

`A`

#### Parameters

##### ms

`number`

#### Returns

> (`s`): [`Stream`](../type-aliases/Stream.md)\<`A`\>

##### Parameters

###### s

[`Stream`](../type-aliases/Stream.md)\<`A`\>

##### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### distinctUntilChanged()

> **distinctUntilChanged**\<`A`\>(`equals?`): (`s`) => [`Stream`](../type-aliases/Stream.md)\<`A`\>

Emit only when the value differs from the previous emission.

#### Type Parameters

##### A

`A`

#### Parameters

##### equals?

(`a`, `b`) => `boolean`

Optional custom equality check

#### Returns

> (`s`): [`Stream`](../type-aliases/Stream.md)\<`A`\>

##### Parameters

###### s

[`Stream`](../type-aliases/Stream.md)\<`A`\>

##### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### empty()

> **empty**\<`A`\>(): [`Stream`](../type-aliases/Stream.md)\<`A`\>

Stream that immediately completes without emitting values.

#### Type Parameters

##### A

`A`

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### fromArray()

> **fromArray**\<`A`\>(`arr`): [`Stream`](../type-aliases/Stream.md)\<`A`\>

Emit all items of an array synchronously, then complete.

#### Type Parameters

##### A

`A`

#### Parameters

##### arr

`A`[]

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### fromEvent()

> **fromEvent**\<`E`\>(`target`, `eventName`): [`Stream`](../type-aliases/Stream.md)\<`E`\>

Create a Stream from DOM events.

#### Type Parameters

##### E

`E` *extends* `Event`

#### Parameters

##### target

`EventTarget`

EventTarget to subscribe on

##### eventName

`string`

Event name string

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`E`\>

### fromPromise()

> **fromPromise**\<`A`\>(`p`): [`Stream`](../type-aliases/Stream.md)\<`A`\>

Convert a Promise into a Stream emitting one value then completing.
Unsubscription cancels the resolution (ignores result/error).

#### Type Parameters

##### A

`A`

#### Parameters

##### p

`Promise`\<`A`\>

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### interval()

> **interval**(`ms`): [`Stream`](../type-aliases/Stream.md)\<`number`\>

Emit an increasing integer every `ms` milliseconds.

#### Parameters

##### ms

`number`

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`number`\>

### merge()

> **merge**\<`A`\>(`s1`, `s2`): [`Stream`](../type-aliases/Stream.md)\<`A`\>

Merge two streams, interleaving events as they arrive.

#### Type Parameters

##### A

`A`

#### Parameters

##### s1

[`Stream`](../type-aliases/Stream.md)\<`A`\>

##### s2

[`Stream`](../type-aliases/Stream.md)\<`A`\>

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### never()

> **never**\<`A`\>(): [`Stream`](../type-aliases/Stream.md)\<`A`\>

Stream that never emits, errors, or completes.

#### Type Parameters

##### A

`A`

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### of()

> **of**\<`A`\>(`a`): [`Stream`](../type-aliases/Stream.md)\<`A`\>

Create a Stream that emits a single value then completes.

#### Type Parameters

##### A

`A`

#### Parameters

##### a

`A`

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### periodic()

> **periodic**(`ms`): [`Stream`](../type-aliases/Stream.md)\<`void`\>

Emit `undefined` every `ms` milliseconds.

#### Parameters

##### ms

`number`

#### Returns

[`Stream`](../type-aliases/Stream.md)\<`void`\>

### throttle()

> **throttle**\<`A`\>(`ms`): (`s`) => [`Stream`](../type-aliases/Stream.md)\<`A`\>

Throttle a stream: emit at most one event every `ms` milliseconds.

#### Type Parameters

##### A

`A`

#### Parameters

##### ms

`number`

#### Returns

> (`s`): [`Stream`](../type-aliases/Stream.md)\<`A`\>

##### Parameters

###### s

[`Stream`](../type-aliases/Stream.md)\<`A`\>

##### Returns

[`Stream`](../type-aliases/Stream.md)\<`A`\>

### zip()

> **zip**\<`A`, `B`\>(`sa`, `sb`): [`Stream`](../type-aliases/Stream.md)\<\[`A`, `B`\]\>

Zip two streams pairwise.
Emits only when both queues have available events.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### sa

[`Stream`](../type-aliases/Stream.md)\<`A`\>

##### sb

[`Stream`](../type-aliases/Stream.md)\<`B`\>

#### Returns

[`Stream`](../type-aliases/Stream.md)\<\[`A`, `B`\]\>
