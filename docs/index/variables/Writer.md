[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Writer

# Variable: Writer

> **Writer**: `object`

Defined in: [adt/writer.ts:14](https://github.com/boazblake/algebraic-fx/blob/9dcafc922caae8a966ba8d965603f0ba145dd83c/src/adt/writer.ts#L14)

Unified namespace export containing all Writer functions and types.

## Type Declaration

### ap()

> **ap**: \<`W`, `A`, `B`\>(`wf`) => (`wa`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

Point-free ap over Writer.

#### Type Parameters

##### W

`W`

##### A

`A`

##### B

`B`

#### Parameters

##### wf

[`Writer`](../type-aliases/Writer.md)\<`W`, (`a`) => `B`\>

#### Returns

> (`wa`): [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

##### Parameters

###### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

##### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

### censor()

> **censor**: \<`W`, `A`\>(`wa`, `f`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

Execute a Writer and pass both the value and log to a function,
then continue with the modified log.

#### Type Parameters

##### W

`W`

##### A

`A`

#### Parameters

##### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

The Writer to censor

##### f

(`w`) => `W`

Function to transform the log

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

#### Example

```ts
const w = Writer.tell(["error"], [], (a, b) => [...a, ...b]);
const censored = Writer.censor(w, logs => logs.map(l => "[REDACTED]"));
```

### chain()

> **chain**: \<`W`, `A`, `B`\>(`f`) => (`wa`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

Point-free chain over Writer.

#### Type Parameters

##### W

`W`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

#### Returns

> (`wa`): [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

##### Parameters

###### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

##### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

### evalWriter()

> **evalWriter**: \<`W`, `A`\>(`wa`) => `A`

Extract the value from a Writer, discarding the log.

#### Type Parameters

##### W

`W`

##### A

`A`

#### Parameters

##### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

#### Returns

`A`

### execWriter()

> **execWriter**: \<`W`, `A`\>(`wa`) => `W`

Extract the log from a Writer, discarding the value.

#### Type Parameters

##### W

`W`

##### A

`A`

#### Parameters

##### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

#### Returns

`W`

### listen()

> **listen**: \<`W`, `A`\>(`wa`) => [`Writer`](../type-aliases/Writer.md)\<`W`, \[`A`, `W`\]\>

Execute a Writer and also include the log in the result.
Useful for introspecting the accumulated log.

#### Type Parameters

##### W

`W`

##### A

`A`

#### Parameters

##### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

The Writer to listen to

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, \[`A`, `W`\]\>

#### Example

```ts
const w = Writer.of(42, "", (a, b) => a + b);
const listened = Writer.listen(w, "", (a, b) => a + b);
listened.run() // [[42, ""], ""]
```

### map()

> **map**: \<`W`, `A`, `B`\>(`f`) => (`wa`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

Point-free map over Writer.

#### Type Parameters

##### W

`W`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => `B`

#### Returns

> (`wa`): [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

##### Parameters

###### wa

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

##### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

### of()

> **of**: \<`W`, `A`\>(`a`, `empty`, `combine`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

Lift a pure value into Writer with empty log.

#### Type Parameters

##### W

`W`

##### A

`A`

#### Parameters

##### a

`A`

The value to wrap

##### empty

`W`

The monoid empty/identity element

##### combine

(`w1`, `w2`) => `W`

The monoid combine operation (defaults to smart combine)

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>

#### Example

```ts
Writer.of(42, [], (a, b) => [...a, ...b])  // Writer with empty array log
Writer.of(42, "", (a, b) => a + b)         // Writer with empty string log
```

### sequence()

> **sequence**: \<`W`, `A`\>(`writers`, `empty`, `combine`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `A`[]\>

Sequence an array of Writers, combining logs sequentially.

#### Type Parameters

##### W

`W`

##### A

`A`

#### Parameters

##### writers

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`\>[]

Array of Writers to sequence

##### empty

`W`

The monoid empty element

##### combine

(`w1`, `w2`) => `W`

The monoid combine operation

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `A`[]\>

#### Example

```ts
const w1 = Writer.of(1, [], (a, b) => [...a, ...b]);
const w2 = Writer.of(2, [], (a, b) => [...a, ...b]);
Writer.sequence([w1, w2], [], (a, b) => [...a, ...b]).run() // [[1, 2], []]
```

### tell()

> **tell**: \<`W`\>(`w`, `empty`, `combine`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `void`\>

Write a log entry without producing a value.

#### Type Parameters

##### W

`W`

#### Parameters

##### w

`W`

The log value to write

##### empty

`W`

The monoid empty/identity element

##### combine

(`w1`, `w2`) => `W`

The monoid combine operation

#### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `void`\>

#### Example

```ts
Writer.tell(["action performed"], [], (a, b) => [...a, ...b])
```

### traverse()

> **traverse**: \<`W`, `A`, `B`\>(`f`, `empty`, `combine`) => (`arr`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`[]\>

Traverse an array using a Writer-producing function, collecting results and logs.

#### Type Parameters

##### W

`W`

##### A

`A`

##### B

`B`

#### Parameters

##### f

(`a`) => [`Writer`](../type-aliases/Writer.md)\<`W`, `B`\>

Function that produces a Writer for each element

##### empty

`W`

The monoid empty element

##### combine

(`w1`, `w2`) => `W`

The monoid combine operation

#### Returns

> (`arr`): [`Writer`](../type-aliases/Writer.md)\<`W`, `B`[]\>

##### Parameters

###### arr

`A`[]

##### Returns

[`Writer`](../type-aliases/Writer.md)\<`W`, `B`[]\>

#### Example

```ts
const f = (n: number) => Writer.of(n * 2, [n], (a, b) => [...a, ...b]);
Writer.traverse(f, [], (a, b) => [...a, ...b])([1, 2, 3]).run()
// [[2, 4, 6], [1, 2, 3]]
```
