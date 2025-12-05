/**
 * Unique nominal brand for Maybe. Prevents structural collisions with plain
 * objects that accidentally look like Just or Nothing.
 */
// declare const MaybeBrand: unique symbol;

const MaybeBrand = Symbol("MaybeBrand");

/**
 * A Maybe represents an optional value: either `Just<A>` or `Nothing`.
 *
 * It is used instead of `null` or `undefined` to model absence explicitly and
 * safely, supporting:
 * - Functor map
 * - Applicative ap
 * - Monad chain
 * - fold (pattern matching)
 * - Conversions to/from nullable
 *
 * @typeParam A The wrapped value type
 */
export type Just<A> = { _tag: "Just"; value: A };
export type Nothing = { _tag: "Nothing" };

/**
 * Union type for Maybe, enriched with a nominal brand.
 */
export type Maybe<A> = (Just<A> | Nothing) & {
  readonly [MaybeBrand]: true;
};

/**
 * Construct a `Just` value.
 */
export const Just = <A>(value: A): Maybe<A> => ({
  _tag: "Just",
  value,
  [MaybeBrand]: true,
});

/**
 * The singleton Nothing value, representing absence.
 */
export const Nothing: Maybe<never> = {
  _tag: "Nothing",
  [MaybeBrand]: true,
};

/**
 * Functor map: transform the inner value when present.
 *
 * @example
 * map(x => x + 1, Just(2))    // Just(3)
 * map(x => x + 1, Nothing)    // Nothing
 */
export const map = <A, B>(f: (a: A) => B, ma: Maybe<A>): Maybe<B> =>
  ma._tag === "Just" ? Just(f(ma.value)) : Nothing;

/**
 * Applicative apply: apply a Maybe-wrapped function to a Maybe-wrapped value.
 *
 * @example
 * ap(Just(x => x + 1), Just(2))   // Just(3)
 * ap(Just(x => x + 1), Nothing)   // Nothing
 * ap(Nothing, Just(2))            // Nothing
 */
export const ap = <A, B>(mf: Maybe<(a: A) => B>, ma: Maybe<A>): Maybe<B> =>
  mf._tag === "Just" && ma._tag === "Just" ? Just(mf.value(ma.value)) : Nothing;

/**
 * Monad chain / flatMap:
 * Run a function returning another Maybe if value is present.
 *
 * @example
 * chain(x => x > 0 ? Just(x) : Nothing, Just(1))   // Just(1)
 * chain(x => Nothing, Just(1))                     // Nothing
 * chain(f, Nothing)                                // Nothing
 */
export const chain = <A, B>(f: (a: A) => Maybe<B>, ma: Maybe<A>): Maybe<B> =>
  ma._tag === "Just" ? f(ma.value) : Nothing;

/**
 * Lift a value into a `Just`.
 */
export const of = <A>(a: A): Maybe<A> => Just(a);

/**
 * Pattern matching for Maybe.
 *
 * @example
 * fold(() => 0, x => x * 2, Just(3))    // 6
 * fold(() => 0, x => x * 2, Nothing)    // 0
 */
export const fold = <A, B>(
  onNothing: () => B,
  onJust: (a: A) => B,
  ma: Maybe<A>
): B => (ma._tag === "Nothing" ? onNothing() : onJust(ma.value));

/**
 * Extract the value or fall back to a default.
 */
export const getOrElse = <A>(defaultValue: A, ma: Maybe<A>): A =>
  ma._tag === "Just" ? ma.value : defaultValue;

/**
 * Extract the value or compute the default lazily.
 */
export const getOrElseW = <A, B>(onNothing: () => B, ma: Maybe<A>): A | B =>
  ma._tag === "Just" ? ma.value : onNothing();

/**
 * Alternative: return the first Just encountered.
 */
export const alt = <A>(ma1: Maybe<A>, ma2: Maybe<A>): Maybe<A> =>
  ma1._tag === "Just" ? ma1 : ma2;

/**
 * Convert `null | undefined | A` into Maybe.
 *
 * @example
 * fromNullable(null)      // Nothing
 * fromNullable(undefined) // Nothing
 * fromNullable(5)         // Just(5)
 */
export const fromNullable = <A>(
  a: A | null | undefined
): Maybe<NonNullable<A>> => (a == null ? Nothing : Just(a as NonNullable<A>));

/**
 * Convert Maybe into nullable.
 */
export const toNullable = <A>(ma: Maybe<A>): A | null =>
  ma._tag === "Just" ? ma.value : null;

/**
 * Convert Maybe into undefined.
 */
export const toUndefined = <A>(ma: Maybe<A>): A | undefined =>
  ma._tag === "Just" ? ma.value : undefined;

/**
 * Type guard: detect Just.
 */
export const isJust = <A>(ma: Maybe<A>): ma is Maybe<A> => ma._tag === "Just";

/**
 * Type guard: detect Nothing.
 */
export const isNothing = <A>(ma: Maybe<A>): ma is Maybe<never> =>
  ma._tag === "Nothing";

/**
 * Filter a Maybe by predicate.
 *
 * Keeps Just(a) if predicate(a) is true, otherwise returns Nothing.
 */
export const filter = <A>(
  predicate: (a: A) => boolean,
  ma: Maybe<A>
): Maybe<A> => (ma._tag === "Just" && predicate(ma.value) ? ma : Nothing);

/**
 * Traverse an array with a function returning Maybe.
 * Stops at the first Nothing.
 */
export const traverse = <A, B>(f: (a: A) => Maybe<B>, arr: A[]): Maybe<B[]> => {
  const result: B[] = [];
  for (const a of arr) {
    const mb = f(a);
    if (mb._tag === "Nothing") return Nothing;
    result.push(mb.value);
  }
  return Just(result);
};

/**
 * Sequence an array of Maybes:
 * - If any element is Nothing, result is Nothing
 * - Otherwise returns Just(array of values)
 */
export const sequence = <A>(arr: Maybe<A>[]): Maybe<A[]> =>
  traverse((x) => x, arr);

/**
 * Unified module-style export containing all Maybe functions.
 */
export const Maybe = {
  Just,
  Nothing,
  map,
  ap,
  chain,
  of,
  fold,
  getOrElse,
  getOrElseW,
  alt,
  fromNullable,
  toNullable,
  toUndefined,
  isJust,
  isNothing,
  filter,
  traverse,
  sequence,
};

export default Maybe;
