/**
 * Unique nominal brand for Maybe. Prevents structural collisions with plain
 * objects that accidentally look like Just or Nothing.
 */
declare const MaybeBrand: unique symbol;
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
export type Just<A> = {
    _tag: "Just";
    value: A;
    [MaybeBrand]: true;
};
export type Nothing = {
    _tag: "Nothing";
    [MaybeBrand]: true;
};
/**
 * Union type for Maybe, enriched with a nominal brand.
 */
export type Maybe<A> = (Just<A> | Nothing) & {
    readonly [MaybeBrand]: true;
};
/**
 * Construct a `Just` value.
 */
export declare const Just: <A>(value: A) => Maybe<A>;
/**
 * The singleton Nothing value, representing absence.
 */
export declare const Nothing: Maybe<never>;
/**
 * Functor map: transform the inner value when present.
 *
 * @example
 * map(x => x + 1, Just(2))    // Just(3)
 * map(x => x + 1, Nothing)    // Nothing
 */
export declare const map: <A, B>(f: (a: A) => B, ma: Maybe<A>) => Maybe<B>;
/**
 * Applicative apply: apply a Maybe-wrapped function to a Maybe-wrapped value.
 *
 * @example
 * ap(Just(x => x + 1), Just(2))   // Just(3)
 * ap(Just(x => x + 1), Nothing)   // Nothing
 * ap(Nothing, Just(2))            // Nothing
 */
export declare const ap: <A, B>(mf: Maybe<(a: A) => B>, ma: Maybe<A>) => Maybe<B>;
/**
 * Monad chain / flatMap:
 * Run a function returning another Maybe if value is present.
 *
 * @example
 * chain(x => x > 0 ? Just(x) : Nothing, Just(1))   // Just(1)
 * chain(x => Nothing, Just(1))                     // Nothing
 * chain(f, Nothing)                                // Nothing
 */
export declare const chain: <A, B>(f: (a: A) => Maybe<B>, ma: Maybe<A>) => Maybe<B>;
/**
 * Lift a value into a `Just`.
 */
export declare const of: <A>(a: A) => Maybe<A>;
/**
 * Pattern matching for Maybe.
 *
 * @example
 * fold(() => 0, x => x * 2, Just(3))    // 6
 * fold(() => 0, x => x * 2, Nothing)    // 0
 */
export declare const fold: <A, B>(onNothing: () => B, onJust: (a: A) => B, ma: Maybe<A>) => B;
/**
 * Extract the value or fall back to a default.
 */
export declare const getOrElse: <A>(defaultValue: A, ma: Maybe<A>) => A;
/**
 * Extract the value or compute the default lazily.
 */
export declare const getOrElseW: <A, B>(onNothing: () => B, ma: Maybe<A>) => A | B;
/**
 * Alternative: return the first Just encountered.
 */
export declare const alt: <A>(ma1: Maybe<A>, ma2: Maybe<A>) => Maybe<A>;
/**
 * Convert `null | undefined | A` into Maybe.
 *
 * @example
 * fromNullable(null)      // Nothing
 * fromNullable(undefined) // Nothing
 * fromNullable(5)         // Just(5)
 */
export declare const fromNullable: <A>(a: A | null | undefined) => Maybe<NonNullable<A>>;
/**
 * Convert Maybe into nullable.
 */
export declare const toNullable: <A>(ma: Maybe<A>) => A | null;
/**
 * Convert Maybe into undefined.
 */
export declare const toUndefined: <A>(ma: Maybe<A>) => A | undefined;
/**
 * Type guard: detect Just.
 */
export declare const isJust: <A>(ma: Maybe<A>) => ma is Just<A>;
/**
 * Type guard: detect Nothing.
 */
export declare const isNothing: <A>(ma: Maybe<A>) => ma is Nothing;
/**
 * Filter a Maybe by predicate.
 *
 * Keeps Just(a) if predicate(a) is true, otherwise returns Nothing.
 */
export declare const filter: <A>(predicate: (a: A) => boolean, ma: Maybe<A>) => Maybe<A>;
/**
 * Traverse an array with a function returning Maybe.
 * Stops at the first Nothing.
 */
export declare const traverse: <A, B>(f: (a: A) => Maybe<B>, arr: A[]) => Maybe<B[]>;
/**
 * Sequence an array of Maybes:
 * - If any element is Nothing, result is Nothing
 * - Otherwise returns Just(array of values)
 */
export declare const sequence: <A>(arr: Maybe<A>[]) => Maybe<A[]>;
/**
 * Unified module-style export containing all Maybe functions.
 */
export declare const Maybe: {
    Just: <A>(value: A) => Maybe<A>;
    Nothing: Nothing & {
        readonly [MaybeBrand]: true;
    };
    map: <A, B>(f: (a: A) => B, ma: Maybe<A>) => Maybe<B>;
    ap: <A, B>(mf: Maybe<(a: A) => B>, ma: Maybe<A>) => Maybe<B>;
    chain: <A, B>(f: (a: A) => Maybe<B>, ma: Maybe<A>) => Maybe<B>;
    of: <A>(a: A) => Maybe<A>;
    fold: <A, B>(onNothing: () => B, onJust: (a: A) => B, ma: Maybe<A>) => B;
    getOrElse: <A>(defaultValue: A, ma: Maybe<A>) => A;
    getOrElseW: <A, B>(onNothing: () => B, ma: Maybe<A>) => A | B;
    alt: <A>(ma1: Maybe<A>, ma2: Maybe<A>) => Maybe<A>;
    fromNullable: <A>(a: A | null | undefined) => Maybe<NonNullable<A>>;
    toNullable: <A>(ma: Maybe<A>) => A | null;
    toUndefined: <A>(ma: Maybe<A>) => A | undefined;
    isJust: <A>(ma: Maybe<A>) => ma is Just<A>;
    isNothing: <A>(ma: Maybe<A>) => ma is Nothing;
    filter: <A>(predicate: (a: A) => boolean, ma: Maybe<A>) => Maybe<A>;
    traverse: <A, B>(f: (a: A) => Maybe<B>, arr: A[]) => Maybe<B[]>;
    sequence: <A>(arr: Maybe<A>[]) => Maybe<A[]>;
};
export default Maybe;
//# sourceMappingURL=maybe.d.ts.map