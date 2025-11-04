/** Constructors */
export const Left = (l) => ({ _tag: "Left", left: l });
export const Right = (r) => ({ _tag: "Right", right: r });
/** Functor map */
export const map = (f, e) => (e._tag === "Right" ? Right(f(e.right)) : e);
/** Monad chain */
export const chain = (f, e) => (e._tag === "Right" ? f(e.right) : e);
/** Fold (pattern match) */
export const fold = (onLeft, onRight, e) => (e._tag === "Left" ? onLeft(e.left) : onRight(e.right));
/** Applicative */
export const of = (a) => Right(a);
/** Combine as a single runtime object (so Either.Right() works) */
export const Either = { Left, Right, map, chain, fold, of };
export default Either;
