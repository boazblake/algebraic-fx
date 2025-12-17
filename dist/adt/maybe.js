// src/adt/maybe.ts
import { fl } from "./fl.js";
export const isJust = (m) => m._tag === "Just";
export const isNothing = (m) => m._tag === "Nothing";
export const isMaybe = (u) => {
    if (!u || typeof u !== "object")
        return false;
    const tag = u._tag;
    return tag === "Just" || tag === "Nothing";
};
export const of = (a) => just(a);
export const just = (value) => ({
    _tag: "Just",
    value,
    [fl.map]: (f) => just(f(value)),
    [fl.chain]: (f) => f(value),
    [fl.ap]: (mf) => isJust(mf) ? just(mf.value(value)) : nothing,
    [fl.of]: of,
});
export const nothing = {
    _tag: "Nothing",
    [fl.map]: () => nothing,
    [fl.chain]: () => nothing,
    [fl.ap]: () => nothing,
    [fl.of]: of,
};
// Functor
export const map = (f) => (ma) => isJust(ma) ? just(f(ma.value)) : nothing;
// Monad
export const chain = (f) => (ma) => isJust(ma) ? f(ma.value) : nothing;
// Applicative
export const ap = (mf) => (ma) => isJust(mf) && isJust(ma) ? just(mf.value(ma.value)) : nothing;
// Helpers
export const fromNullable = (a) => a == null ? nothing : just(a);
export const toNullable = (ma) => isJust(ma) ? ma.value : null;
export const toUndefined = (ma) => isJust(ma) ? ma.value : undefined;
export const fromPredicate = (pred) => (a) => pred(a) ? just(a) : nothing;
export const withDefault = (onNothing) => (ma) => isJust(ma) ? ma.value : onNothing;
export const match = (onNothing, onJust) => (ma) => isJust(ma) ? onJust(ma.value) : onNothing();
export const maybe = (onNothing, onJust) => (ma) => isJust(ma) ? onJust(ma.value) : onNothing;
// Traversable helpers (standard signature, used by other modules if needed)
export const traverse = (ofF, mapF, apF, f) => (ma) => isJust(ma)
    ? mapF((b) => just(b))(f(ma.value))
    : ofF(nothing);
export const sequence = (ofF, mapF, apF) => (mma) => isJust(mma)
    ? mapF((a) => just(a))(mma.value)
    : ofF(nothing);
// fp-ts style dictionary
export const MAYBE_URI = "Maybe";
export const MaybeModule = {
    URI: MAYBE_URI,
    of,
    map,
    ap,
    chain,
    fromNullable,
    fromPredicate,
    withDefault,
    match,
    maybe,
};
//# sourceMappingURL=maybe.js.map