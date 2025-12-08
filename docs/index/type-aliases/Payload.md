[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / Payload

# Type Alias: Payload\<T, M\>

> **Payload**\<`T`, `M`\> = `object`

Defined in: [core/types.ts:81](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/types.ts#L81)

Canonical message shape.

## Type Parameters

### T

`T` *extends* `string`

string literal type tag, recommend namespacing: "Holdings.Add"

### M

`M` *extends* `object` = \{ \}

payload record for this message, defaults to {}

Example:

  type Msg =
    | Payload<"Holdings.Add">
    | Payload<"Holdings.SetTicker", { value: string }>;

  dispatch({ type: "Holdings.SetTicker", msg: { value: "AAPL" } });

## Properties

### msg

> **msg**: `M`

Defined in: [core/types.ts:83](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/types.ts#L83)

***

### type

> **type**: `T`

Defined in: [core/types.ts:82](https://github.com/boazblake/algebraic-fx/blob/b036f4a8df41f3b3c19947d5c6ee4f36e81c2dfc/src/core/types.ts#L82)
