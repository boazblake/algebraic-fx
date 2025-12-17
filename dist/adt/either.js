// src/adt/either.ts
import { fl } from "./fl.js";
export const isLeft = (fa) => fa._tag === "Left";
export const isRight = (fa) => fa._tag === "Right";
export const left = (e) => withInstanceMethods({
    _tag: "Left",
    left: e,
});
export const right = (a) => withInstanceMethods({
    _tag: "Right",
    right: a,
});
/**
 * Applicative "of" injects a value in the Right side.
 */
export const of = (a) => right(a);
/**
 * Functor map.
 */
export const map = (fa, f) => {
    if (isLeft(fa))
        return fa;
    return right(f(fa.right));
};
/**
 * Map over the Left side.
 */
export const mapLeft = (fa, f) => {
    if (isLeft(fa))
        return left(f(fa.left));
    return fa;
};
/**
 * Bimap over both sides.
 */
export const bimap = (fa, f, g) => {
    if (isLeft(fa))
        return left(f(fa.left));
    return right(g(fa.right));
};
/**
 * Apply. If either side is Left, it short circuits.
 */
export const ap = (fab, fa) => {
    if (isLeft(fab))
        return fab;
    if (isLeft(fa))
        return fa;
    return right(fab.right(fa.right));
};
/**
 * Monad chain.
 */
export const chain = (fa, f) => {
    if (isLeft(fa))
        return fa;
    return f(fa.right);
};
/**
 * Swap Left and Right.
 */
export const swap = (fa) => {
    if (isLeft(fa))
        return right(fa.left);
    return left(fa.right);
};
/**
 * Pattern match.
 */
export const match = (onLeft, onRight) => (fa) => isLeft(fa) ? onLeft(fa.left) : onRight(fa.right);
/**
 * Same as match but flipped argument order, aligns with maybe().
 */
export const either = (onLeft, onRight) => (fa) => match(onLeft, onRight)(fa);
/**
 * Extract with default for Left.
 */
export const getOrElse = (onLeft) => (fa) => isLeft(fa) ? onLeft(fa.left) : fa.right;
/**
 * Build Either from nullable value.
 */
export const fromNullable = (onNull) => (a) => a == null ? left(onNull()) : right(a);
/**
 * Build Either from predicate.
 */
export const fromPredicate = (predicate, onFalse) => (a) => predicate(a) ? right(a) : left(onFalse(a));
/**
 * Effectful construction with error capture.
 */
export const tryCatch = (thunk, onThrow) => {
    try {
        return right(thunk());
    }
    catch (e) {
        return left(onThrow(e));
    }
};
/**
 * Narrow type guard for Either values.
 */
export const isEither = (u) => !!u &&
    typeof u === "object" &&
    "_tag" in u &&
    ((u._tag === "Left" && "left" in u) ||
        (u._tag === "Right" && "right" in u));
const withInstanceMethods = (ea) => {
    const self = ea;
    self[fl.map] = (f) => map(self, f);
    self[fl.chain] = (f) => chain(self, f);
    // Method form: fab[fl.ap](fa)
    self[fl.ap] = (fa) => 
    // cast through unknown to satisfy type relations without cost at runtime
    ap(self, fa);
    self[fl.bimap] = (f, g) => bimap(self, f, g);
    return self;
};
/**
 * fp ts style module dictionary.
 */
export const EitherModule = {
    URI: "Either",
    left,
    right,
    of,
    isLeft,
    isRight,
    map,
    mapLeft,
    bimap,
    ap,
    chain,
    swap,
    match,
    either,
    getOrElse,
    fromNullable,
    fromPredicate,
    tryCatch,
    isEither,
    [fl.of]: of,
};
//# sourceMappingURL=either.js.map