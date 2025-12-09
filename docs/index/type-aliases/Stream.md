[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Stream

# Type Alias: Stream\<A\>

> **Stream**\<`A`\> = `object`

Defined in: [adt/stream.ts:41](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L41)

Push-based functional stream abstraction.

Stream<A> is:
- Lazy: nothing happens until `subscribe`
- Cold: each subscription creates its own execution
- Composable: map, chain (switchMap), filter, scan, take, skip, etc.

This is intentionally minimal and inspired by `most.js` and RxJS primitives,
but with far less surface area.

## Type Parameters

### A

`A`

value type

## Properties

### \[StreamBrand\]

> `readonly` **\[StreamBrand\]**: `true`

Defined in: [adt/stream.ts:42](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L42)

***

### chain()

> **chain**: \<`B`\>(`f`) => `Stream`\<`B`\>

Defined in: [adt/stream.ts:60](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L60)

Monadic bind / switchMap:
- Cancels previously active inner stream whenever a new value arrives
- Subscribes to the new inner stream

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `Stream`\<`B`\>

#### Returns

`Stream`\<`B`\>

***

### filter()

> **filter**: (`predicate`) => `Stream`\<`A`\>

Defined in: [adt/stream.ts:63](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L63)

Filter emitted values by predicate.

#### Parameters

##### predicate

(`a`) => `boolean`

#### Returns

`Stream`\<`A`\>

***

### map()

> **map**: \<`B`\>(`f`) => `Stream`\<`B`\>

Defined in: [adt/stream.ts:53](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L53)

Functor map: transform each emitted value.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

`Stream`\<`B`\>

***

### scan()

> **scan**: \<`B`\>(`f`, `initial`) => `Stream`\<`B`\>

Defined in: [adt/stream.ts:71](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L71)

Accumulate values using a reducer.

#### Type Parameters

##### B

`B`

#### Parameters

##### f

(`acc`, `a`) => `B`

Reducer function `(acc, value) => newAcc`

##### initial

`B`

Initial accumulator value

#### Returns

`Stream`\<`B`\>

***

### skip()

> **skip**: (`n`) => `Stream`\<`A`\>

Defined in: [adt/stream.ts:81](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L81)

Skip the first `n` values and emit the rest.

#### Parameters

##### n

`number`

#### Returns

`Stream`\<`A`\>

***

### subscribe()

> **subscribe**: (`o`) => `Unsubscribe`

Defined in: [adt/stream.ts:50](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L50)

Begin receiving values from the stream.

#### Parameters

##### o

`Observer`\<`A`\>

Observer callbacks

#### Returns

`Unsubscribe`

Unsubscribe function

***

### take()

> **take**: (`n`) => `Stream`\<`A`\>

Defined in: [adt/stream.ts:76](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/stream.ts#L76)

Emit only the first `n` values, then complete.

#### Parameters

##### n

`number`

#### Returns

`Stream`\<`A`\>
