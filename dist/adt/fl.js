// src/adt/fl.ts
// src/adt/fl.ts
const globalKey = "__algebraic_fx_fl_registry__";
export const fl = globalThis[globalKey] ||
    (globalThis[globalKey] = {
        map: Symbol.for("fantasy-land/map"),
        ap: Symbol.for("fantasy-land/ap"),
        chain: Symbol.for("fantasy-land/chain"),
        of: Symbol.for("fantasy-land/of"),
        empty: Symbol.for("fantasy-land/empty"),
        bimap: Symbol.for("fantasy-land/bimap"),
        concat: Symbol.for("fantasy-land/concat"),
    });
//# sourceMappingURL=fl.js.map