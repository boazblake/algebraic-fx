[**algebraic-fx v0.0.1**](../../README.md)

***

[algebraic-fx](../../README.md) / [index](../README.md) / runDomIO

# Function: runDomIO()

> **runDomIO**\<`A`\>(`rio`, `env`): `A`

Defined in: [src/helpers/dom-helpers.ts:240](https://github.com/boazblake/algebraic-fx/blob/0b28b3727a07ca5e1acb960c3972c30126bce32d/src/helpers/dom-helpers.ts#L240)

Execute a `Reader<DomEnv, IO<A>>` inside a concrete `DomEnv`.

Equivalent to:
  reader.run(env).run()

This helper is convenient for using DOM effects outside of Programs,
or for imperative code in development.

## Type Parameters

### A

`A`

## Parameters

### rio

A Reader<DomEnv, IO<A>> effect.

#### run

(`env`) => `object`

### env

[`DomEnv`](../type-aliases/DomEnv.md)

The DomEnv used to resolve DOM operations.

## Returns

`A`

The result of executing the IO.

## Example

```ts
runDomIO(writeToElement("#root", "<p>Hello</p>"), env);
```
