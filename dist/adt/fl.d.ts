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
export declare const fl_map: unique symbol;
/** @internal */
export declare const fl_ap: unique symbol;
/** @internal */
export declare const fl_chain: unique symbol;
/** @internal */
export declare const fl_of: unique symbol;
/** @internal */
export declare const fl_empty: unique symbol;
/** @internal */
export declare const fl_bimap: unique symbol;
/** @internal */
export declare const fl_concat: unique symbol;
export declare const fl: {
    readonly map: typeof fl_map;
    readonly ap: typeof fl_ap;
    readonly chain: typeof fl_chain;
    readonly of: typeof fl_of;
    readonly empty: typeof fl_empty;
    readonly bimap: typeof fl_bimap;
    readonly concat: typeof fl_concat;
};
//# sourceMappingURL=fl.d.ts.map