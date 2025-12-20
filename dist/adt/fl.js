// src/adt/fl.ts
/**
 * Fantasy-Land symbol registry.
 *
 * Symbols MUST be created with Symbol.for(...)
 * to preserve interop across realms and libraries.
 *
 * We export each symbol as a named constant to
 * avoid TypeScript collapsing them into an
 * intersected `symbol` type.
 */
/** @internal */
export const fl_map = Symbol.for("fantasy-land/map");
/** @internal */
export const fl_ap = Symbol.for("fantasy-land/ap");
/** @internal */
export const fl_chain = Symbol.for("fantasy-land/chain");
/** @internal */
export const fl_of = Symbol.for("fantasy-land/of");
/** @internal */
export const fl_empty = Symbol.for("fantasy-land/empty");
/** @internal */
export const fl_bimap = Symbol.for("fantasy-land/bimap");
/** @internal */
export const fl_concat = Symbol.for("fantasy-land/concat");
export const fl = {
    map: fl_map,
    ap: fl_ap,
    chain: fl_chain,
    of: fl_of,
    empty: fl_empty,
    bimap: fl_bimap,
    concat: fl_concat,
};
//# sourceMappingURL=fl.js.map