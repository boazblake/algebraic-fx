[**algebraic-fx v1.0.0**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Stream

# Type Alias: Stream\<A\>

> **Stream**\<`A`\> = `object`

Defined in: [src/adt/stream.ts:42](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L42)

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

Defined in: [src/adt/stream.ts:43](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L43)

***

### chain()

> **chain**: \<`B`\>(`f`) => `Stream`\<`B`\>

Defined in: [src/adt/stream.ts:61](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L61)

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

Defined in: [src/adt/stream.ts:64](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L64)

Filter emitted values by predicate.

#### Parameters

##### predicate

(`a`) => `boolean`

#### Returns

`Stream`\<`A`\>

***

### map()

> **map**: \<`B`\>(`f`) => `Stream`\<`B`\>

Defined in: [src/adt/stream.ts:54](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L54)

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

Defined in: [src/adt/stream.ts:72](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L72)

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

Defined in: [src/adt/stream.ts:82](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L82)

Skip the first `n` values and emit the rest.

#### Parameters

##### n

`number`

#### Returns

`Stream`\<`A`\>

***

### subscribe()

> **subscribe**: (`o`) => `Unsubscribe`

Defined in: [src/adt/stream.ts:51](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L51)

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

Defined in: [src/adt/stream.ts:77](https://github.com/boazblake/algebraic-fx/blob/d7dd4888e8dadc816b4797bb9d287cc5e6126d05/src/adt/stream.ts#L77)

Emit only the first `n` values, then complete.

#### Parameters

##### n

`number`

#### Returns

`Stream`\<`A`\>
