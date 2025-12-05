/**
 * Unique nominal brand for Maybe. Prevents structural collisions with plain
 * objects that accidentally look like Just or Nothing.
 */
// declare const MaybeBrand: unique symbol;
const MaybeBrand = Symbol("MaybeBrand");
/**
 * Construct a `Just` value.
 */
export const Just = (value) => ({
    _tag: "Just",
    value,
    [MaybeBrand]: true,
});
/**
 * The singleton Nothing value, representing absence.
 */
export const Nothing = {
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
export const map = (f, ma) => ma._tag === "Just" ? Just(f(ma.value)) : Nothing;
/**
 * Applicative apply: apply a Maybe-wrapped function to a Maybe-wrapped value.
 *
 * @example
 * ap(Just(x => x + 1), Just(2))   // Just(3)
 * ap(Just(x => x + 1), Nothing)   // Nothing
 * ap(Nothing, Just(2))            // Nothing
 */
export const ap = (mf, ma) => mf._tag === "Just" && ma._tag === "Just" ? Just(mf.value(ma.value)) : Nothing;
/**
 * Monad chain / flatMap:
 * Run a function returning another Maybe if value is present.
 *
 * @example
 * chain(x => x > 0 ? Just(x) : Nothing, Just(1))   // Just(1)
 * chain(x => Nothing, Just(1))                     // Nothing
 * chain(f, Nothing)                                // Nothing
 */
export const chain = (f, ma) => ma._tag === "Just" ? f(ma.value) : Nothing;
/**
 * Lift a value into a `Just`.
 */
export const of = (a) => Just(a);
/**
 * Pattern matching for Maybe.
 *
 * @example
 * fold(() => 0, x => x * 2, Just(3))    // 6
 * fold(() => 0, x => x * 2, Nothing)    // 0
 */
export const fold = (onNothing, onJust, ma) => (ma._tag === "Nothing" ? onNothing() : onJust(ma.value));
/**
 * Extract the value or fall back to a default.
 */
export const getOrElse = (defaultValue, ma) => ma._tag === "Just" ? ma.value : defaultValue;
/**
 * Extract the value or compute the default lazily.
 */
export const getOrElseW = (onNothing, ma) => ma._tag === "Just" ? ma.value : onNothing();
/**
 * Alternative: return the first Just encountered.
 */
export const alt = (ma1, ma2) => ma1._tag === "Just" ? ma1 : ma2;
/**
 * Convert `null | undefined | A` into Maybe.
 *
 * @example
 * fromNullable(null)      // Nothing
 * fromNullable(undefined) // Nothing
 * fromNullable(5)         // Just(5)
 */
export const fromNullable = (a) => (a == null ? Nothing : Just(a));
/**
 * Convert Maybe into nullable.
 */
export const toNullable = (ma) => ma._tag === "Just" ? ma.value : null;
/**
 * Convert Maybe into undefined.
 */
export const toUndefined = (ma) => ma._tag === "Just" ? ma.value : undefined;
/**
 * Type guard: detect Just.
 */
export const isJust = (ma) => ma._tag === "Just";
/**
 * Type guard: detect Nothing.
 */
export const isNothing = (ma) => ma._tag === "Nothing";
/**
 * Filter a Maybe by predicate.
 *
 * Keeps Just(a) if predicate(a) is true, otherwise returns Nothing.
 */
export const filter = (predicate, ma) => (ma._tag === "Just" && predicate(ma.value) ? ma : Nothing);
/**
 * Traverse an array with a function returning Maybe.
 * Stops at the first Nothing.
 */
export const traverse = (f, arr) => {
    const result = [];
    for (const a of arr) {
        const mb = f(a);
        if (mb._tag === "Nothing")
            return Nothing;
        result.push(mb.value);
    }
    return Just(result);
};
/**
 * Sequence an array of Maybes:
 * - If any element is Nothing, result is Nothing
 * - Otherwise returns Just(array of values)
 */
export const sequence = (arr) => traverse((x) => x, arr);
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
//# sourceMappingURL=maybe.js.map